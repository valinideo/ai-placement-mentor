const express = require('express');
const cors = require('cors');
const path = require('path');
const Groq = require('groq-sdk');
const multer = require('multer');
const pdf = require('pdf-parse');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer Setup for File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// INITIALIZE GROQ
if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("YOUR_")) {
  console.warn("\n⚠️  WARNING: GROQ_API_KEY is missing or looks like a placeholder in server/.env");
  console.warn("AI features will not work until you add a valid key.\n");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key",
});

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// SERVE STATIC FRONTEND FILES
app.use(express.static(path.join(__dirname, '..')));

// BASIC ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// AUTHENTICATION APIS (Previous implementation)
app.post("/signup", (req, res) => {
  const { name, email, password, studentType, year, course, branch } = req.body;
  console.log("Signup:", { name, email, branch });
  res.status(201).json({
    message: "Signup successful",
    user: { name, email, studentType, year, course, branch }
  });
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  res.status(200).json({ message: "Login successful" });
});

// RESUME UPLOAD API
app.post("/upload-resume", upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;
    
    console.log("[UPLOAD-RESUME] Extracted text from resume");
    res.json({
      message: "Resume uploaded successfully",
      resumeText: resumeText.substring(0, 5000) // Truncate if too long
    });
  } catch (error) {
    console.error("Resume Parsing Error:", error.message);
    res.status(500).json({ error: "Failed to parse resume", details: error.message });
  }
});

// IN-MEMORY SESSION STORAGE
const sessions = {};

// AI MENTOR APIS

/**
 * @api {post} /ai-chat Personalized AI Mentorship
 */
app.post("/ai-chat", async (req, res) => {
  const { message, name, year, course, branch } = req.body;

  try {
    console.log(`[AI-CHAT] Processing message from: ${name}`);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI mentor helping students prepare for placements. 
          The student's name is ${name}. They are a ${year} ${course} ${branch} student.
          Provide clear, structured, professional and motivating advice. 
          Incorporate their academic details to make the response highly relevant.`
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Groq AI Error (/ai-chat):", error.message);
    res.status(500).json({ 
      error: "Failed to generate AI response",
      details: error.message.includes("API key") ? "Invalid or missing Groq API Key" : error.message
    });
  }
});

// STRUCTURED AI INTERVIEW APIS

/**
 * @api {post} /start-interview Initialize a session
 */
app.post("/start-interview", async (req, res) => {
  const { type, name, year, course, branch, resumeText } = req.body;
  const sessionId = Date.now().toString();

  sessions[sessionId] = {
    type,
    name,
    year,
    course,
    branch,
    resumeText: resumeText || "",
    history: [],
    questionCount: 0,
    followUpCount: 0,
    targetLength: Math.floor(Math.random() * 4) + 5, // Randomly between 5 and 8
    startTime: Date.now(),
    metrics: {
      totalAnswers: 0,
      timings: [],
      emotions: []
    }
  };

  const systemPrompt = `You are a professional ${type} interviewer. 
  Candidate: ${name}, ${year} ${course} ${branch}.
  ${resumeText ? `Candidate's Resume Extract: ${resumeText.substring(0, 2000)}` : "No resume provided. Ask general placement questions."}
  
  Rules:
  - Ask ONE question at a time.
  - Personalize questions using resume (projects, skills) if available.
  - If weak answers -> simplify. If strong -> increase difficulty.
  - Detect emotional tone: If nervous -> encourage. If confident -> challenge.
  - Keep it realistic like a top tech company placement.
  - Start by greeting the candidate and asking the first question.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "I am ready. Please start the interview." }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const firstQuestion = chatCompletion.choices[0].message.content;
    sessions[sessionId].history.push({ role: "assistant", content: firstQuestion });
    sessions[sessionId].questionCount++;

    res.json({ sessionId, firstQuestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to start interview" });
  }
});

/**
 * @api {post} /next-question Process answer and ask next
 */
app.post("/next-question", async (req, res) => {
  const { sessionId, previousAnswer, timeTaken } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ error: "Session not found" });

  session.history.push({ role: "user", content: previousAnswer });
  session.metrics.totalAnswers++;
  if (timeTaken) session.metrics.timings.push(timeTaken);

  // Interview Structure Logic
  let structuralInstruction = "";
  if (session.type === 'HR') {
    if (session.questionCount < session.targetLength) {
      if (session.followUpCount < 2) {
        structuralInstruction = `Follow-up Phase (${session.followUpCount + 1}/2): 
        1. Analyze the user's last answer.
        2. Ask a RELEVANT deep-dive follow-up question specifically about what the user just said (e.g., if they mentioned a project, ask about their role or a challenge).
        3. Maintain conversational flow.`;
        session.followUpCount++;
      } else {
        structuralInstruction = `New Topic Phase: 
        1. Give a very brief closing feedback on the previous topic.
        2. Swiftly MOVE to a completely DIFFERENT HR topic (e.g., Career Aspirations, Personal Strengths, or Conflict Management).
        3. DO NOT ask a follow-up about the previous discussion.`;
        session.followUpCount = 0; // Reset for the new main question
      }
    } else {
      structuralInstruction = "Wrap up the interview. Thank the candidate and state: 'Thank you, that concludes the interview.'";
    }
  } else {
    // DSA / Technical Track Logic
    if (session.questionCount <= 2 && session.resumeText) {
      structuralInstruction = "Ask a technical question based on their projects/experience in the resume.";
    } else if (session.questionCount <= 4) {
      structuralInstruction = "Ask a core technical/conceptual question related to their branch/role.";
    } else if (session.questionCount < session.targetLength) {
      structuralInstruction = "Ask an HR/Situation-based question.";
    } else {
      structuralInstruction = "Wrap up the interview. Thank the candidate and state: 'Thank you, that concludes the interview.'";
    }
  }

  const systemPrompt = `You are a professional ${session.type} interviewer. 
  Candidate: ${session.name}. 
  
  Internalize: Detect candidate's emotion from their answer: nervous, confident, confused, neutral.
  
  Rules:
  - REVIEW the last answer.
  - Give SHORT feedback (max 1 sentence) about their answer to maintain flow.
  - Then ASK the next question based on the instruction.
  - ${structuralInstruction}
  - Adapt difficulty: better answers = deeper follow-ups.
  - Do NOT repeat questions or topics already discussed.
  - Return your response in this JSON format:
    {
      "aiResponse": "Your brief feedback + next question",
      "detectedEmotion": "nervous/confident/confused/neutral",
      "isConcluded": ${session.questionCount >= session.targetLength}
    }`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...session.history.slice(-6)
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content);
    session.history.push({ role: "assistant", content: result.aiResponse });
    session.metrics.emotions.push(result.detectedEmotion);
    session.questionCount++;

    res.json({ 
      aiResponse: result.aiResponse, 
      questionCount: session.questionCount,
      detectedEmotion: result.detectedEmotion,
      isConcluded: result.isConcluded || session.questionCount >= session.targetLength
    });
  } catch (error) {
    console.error("Next Question Error:", error.message);
    res.status(500).json({ error: "Failed to get next question" });
  }
});

/**
 * @api {post} /end-interview Final Evaluation
 */
app.post("/end-interview", async (req, res) => {
  const { sessionId } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ error: "Session not found" });

  const targetLength = session.targetLength || 5;
  const totalAnswers = session.metrics.totalAnswers;
  const completionRate = Math.round((totalAnswers / targetLength) * 100); 
  
  const evaluationPrompt = `You are a Fair & Realistic Interview Evaluator.
  Candidate: ${session.name}.
  
  Performance Metrics:
  - Questions Attempted: ${totalAnswers} / ${targetLength} target.
  - Completion Rate: ${completionRate}%
  - Timings per answer (seconds): ${session.metrics.timings.join(', ')}
  - Detected Emotions: ${session.metrics.emotions.join(', ')}
  
  Rules for Scoring:
  - If 0 answers attempted -> Score: 1/10. Message: "You did not attempt the interview. Please try again."
  - If 1-2 weak answers -> Score: 3-4/10.
  - Reduce score proportionally if ended early.
  - Be strict. Do not give high scores for shallow answers.
  
  Return a JSON response:
  {
    "score": "X/10",
    "completionRate": "${completionRate}%",
    "confidenceLevel": "Low/Moderate/High",
    "communication": "Poor/Average/Good",
    "strengths": ["...", "..."],
    "improvements": ["...", "..."],
    "summary": "Detailed feedback summary...",
    "uiMessage": "Message based on effort (e.g., 'Incomplete', 'Partial attempt')"
  }`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: evaluationPrompt },
        ...session.history
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const evaluation = JSON.parse(chatCompletion.choices[0].message.content);
    delete sessions[sessionId];

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate evaluation" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
