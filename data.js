/**
 * Central Data Store for AI Mentor Tracks
 */

const TRACKS_DATA = {
  dsa: {
    title: "DSA Focused",
    phases: [
      {
        name: "Phase 1: Fundamentals (Easy)",
        topics: [
          {
            id: "arrays-hashing",
            name: "Arrays & Hashing",
            description: "Master the building blocks of data structures.",
            prerequisites: ["Programming Basics", "Loops"],
            questions: [
              { id: "dsa-1", title: "Two Sum", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum/", tags: ["Array", "Hash Table"] },
              { id: "dsa-2", title: "Contains Duplicate", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/contains-duplicate/", tags: ["Array", "Hash Table"] },
              { id: "dsa-3", title: "Valid Anagram", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-anagram/", tags: ["String", "Hash Table"] },
              { id: "dsa-4", title: "Group Anagrams", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/group-anagrams/", tags: ["String", "Hash Table"] },
              { id: "dsa-5", title: "Top K Frequent Elements", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/top-k-frequent-elements/", tags: ["Array", "Heap"] },
              { id: "dsa-6", title: "Product of Array Except Self", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/product-of-array-except-self/", tags: ["Array", "Prefix Sum"] },
              { id: "dsa-7", title: "Valid Sudoku", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/valid-sudoku/", tags: ["Array", "Hash Table"] },
              { id: "dsa-8", title: "Encode and Decode Strings", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/encode-and-decode-strings/", tags: ["String"] },
              { id: "dsa-9", title: "Longest Consecutive Sequence", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-consecutive-sequence/", tags: ["Array", "Hash Table"] },
              { id: "dsa-10", title: "Two Sum II", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", tags: ["Array", "Two Pointers"] },
              { id: "dsa-11", title: "3Sum", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/3sum/", tags: ["Array", "Two Pointers"] },
              { id: "dsa-12", title: "Container With Most Water", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/container-with-most-water/", tags: ["Array", "Two Pointers"] },
              { id: "dsa-13", title: "Trapping Rain Water", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/trapping-rain-water/", tags: ["Array", "Stack"] }
            ]
          }
        ]
      },
      {
        name: "Phase 2: Intermediate (Medium)",
        topics: [
          {
            id: "linked-lists",
            name: "Linked Lists",
            description: "Master pointers and linear structures.",
            prerequisites: ["Memory Basics", "Pointers"],
            questions: [
              { id: "dsa-14", title: "Reverse Linked List", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/reverse-linked-list/", tags: ["Linked List"] },
              { id: "dsa-15", title: "Merge Two Sorted Lists", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/merge-two-sorted-lists/", tags: ["Linked List"] },
              { id: "dsa-16", title: "Linked List Cycle", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/linked-list-cycle/", tags: ["Linked List", "Two Pointers"] },
              { id: "dsa-17", title: "Reorder List", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/reorder-list/", tags: ["Linked List"] },
              { id: "dsa-18", title: "Remove Nth Node From End", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", tags: ["Linked List"] },
              { id: "dsa-19", title: "Copy List with Random Pointer", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", tags: ["Linked List", "Hash Table"] },
              { id: "dsa-20", title: "Add Two Numbers", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/add-two-numbers/", tags: ["Linked List", "Math"] },
              { id: "dsa-21", title: "Find the Duplicate Number", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/find-the-duplicate-number/", tags: ["Array", "Two Pointers"] },
              { id: "dsa-22", title: "LRU Cache", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/lru-cache/", tags: ["Design", "Linked List"] },
              { id: "dsa-23", title: "Merge K Sorted Lists", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/merge-k-sorted-lists/", tags: ["Linked List", "Heap"] },
              { id: "dsa-24", title: "Reverse Nodes in k-Group", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", tags: ["Linked List"] }
            ]
          }
        ]
      },
      {
        name: "Phase 3: Advanced (Hard)",
        topics: [
          {
            id: "graphs",
            name: "Graph Algorithms",
            description: "Advanced connectivity and shortest path problems.",
            prerequisites: ["Trees", "Recursion"],
            questions: [
              { id: "dsa-101", title: "Number of Islands", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-islands/", tags: ["BFS", "DFS", "Graph"] },
              { id: "dsa-102", title: "Clone Graph", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/clone-graph/", tags: ["Graph", "BFS", "DFS"] },
              { id: "dsa-103", title: "Max Area of Island", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/max-area-of-island/", tags: ["Graph", "DFS"] },
              { id: "dsa-104", title: "Pacific Atlantic Water Flow", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", tags: ["Graph", "DFS"] },
              { id: "dsa-105", title: "Surrounded Regions", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/surrounded-regions/", tags: ["Graph", "DFS"] },
              { id: "dsa-106", title: "Course Schedule", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule/", tags: ["Graph", "Topological Sort"] },
              { id: "dsa-107", title: "Course Schedule II", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule-ii/", tags: ["Graph", "Topological Sort"] },
              { id: "dsa-108", title: "Redundant Connection", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/redundant-connection/", tags: ["Graph", "Union Find"] },
              { id: "dsa-109", title: "Number of Connected Components", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", tags: ["Graph", "Union Find"] },
              { id: "dsa-110", title: "Graph Valid Tree", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/graph-valid-tree/", tags: ["Graph", "Union Find"] },
              { id: "dsa-111", title: "Word Ladder", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/word-ladder/", tags: ["BFS", "Hash Table"] }
            ]
          }
        ]
      }
    ]
  },
  fullstack: {
    title: "Full Stack Dev",
    phases: [
      {
        name: "Phase 1: Easy (Frontend)",
        topics: [
          { id: "html-css", name: "HTML & CSS Basics", description: "Layouts and styling.", prerequisites: [], questions: [] }
        ]
      },
      {
        name: "Phase 2: Intermediate (JS)",
        topics: [
          { id: "js-core", name: "Modern JavaScript", description: "ES6+, Async/Await.", prerequisites: [], questions: [] }
        ]
      },
      {
        name: "Phase 3: Difficult (Backend)",
        topics: [
          { id: "node-db", name: "Node.js & Databases", description: "Scalable backends.", prerequisites: [], questions: [] }
        ]
      }
    ]
  },
  aiml: {
    title: "AI / ML Path",
    phases: [
      {
        name: "Phase 1: Easy (Python)",
        topics: [
          { id: "python", name: "Python for DS", description: "NumPy & Pandas.", prerequisites: [], questions: [] }
        ]
      },
      {
        name: "Phase 2: Intermediate (Math)",
        topics: [
          { id: "stats", name: "Statistics & Linear Algebra", description: "The core math of AI.", prerequisites: [], questions: [] }
        ]
      },
      {
        name: "Phase 3: Difficult (Deep Learning)",
        topics: [
          { id: "neural-nets", name: "Neural Networks", description: "PyTorch & TensorFlow.", prerequisites: [], questions: [] }
        ]
      }
    ]
  }
};

/**
 * PROGRESS UTILITIES
 */

/**
 * PROGRESS & STATS UTILITIES
 */

function getUserStats() {
  const defaultStats = {
    questionsSolved: 0,
    questionsAttempted: 0,
    interviewsTaken: 0,
    targetRole: "SDE",
    weakTopics: [],
    strongTopics: [],
    badges: [],
    streak: {
      current: 0,
      longest: 0,
      lastActiveDate: null
    }
  };
  return JSON.parse(localStorage.getItem('userStats')) || defaultStats;
}

function saveUserStats(stats) {
  localStorage.setItem('userStats', JSON.stringify(stats));
}

function getProgress() {
  const defaultProgress = {
    dsa: { attempted: [], completed: [] },
    fullstack: { attempted: [], completed: [] },
    aiml: { attempted: [], completed: [] }
  };
  return JSON.parse(localStorage.getItem('userProgress')) || defaultProgress;
}

function saveProgress(track, id, status) {
  const progress = getProgress();
  const stats = getUserStats();

  if (status === 'attempted') {
    if (!progress[track].attempted.includes(id)) {
      progress[track].attempted.push(id);
      stats.questionsAttempted++;
    }
  } else if (status === 'completed') {
    if (!progress[track].completed.includes(id)) {
      progress[track].completed.push(id);
      stats.questionsSolved++;
      updateStreak();
    } else {
      // Toggle off if already completed (Undo)
      progress[track].completed = progress[track].completed.filter(item => item !== id);
      stats.questionsSolved = Math.max(0, stats.questionsSolved - 1);
    }
  }
  
  localStorage.setItem('userProgress', JSON.stringify(progress));
  saveUserStats(stats);
}

function updateStreak() {
  const stats = getUserStats();
  const today = new Date().toISOString().split('T')[0];
  
  if (stats.streak.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (stats.streak.lastActiveDate === yesterdayStr) {
    stats.streak.current++;
  } else {
    stats.streak.current = 1;
  }
  
  // Update Longest Streak
  if (stats.streak.current > (stats.streak.longest || 0)) {
    stats.streak.longest = stats.streak.current;
  }
  
  stats.streak.lastActiveDate = today;
  checkAndAwardBadges(stats);
  saveUserStats(stats);
}

function checkAndAwardBadges(stats) {
  const newBadges = [];
  
  if (stats.questionsSolved >= 1 && !stats.badges.includes("First Step")) {
    newBadges.push("First Step"); // First question solved
  }
  if (stats.streak.current >= 5 && !stats.badges.includes("Consistent Learner")) {
    newBadges.push("Consistent Learner"); // 5-day streak
  }
  if (stats.interviewsTaken >= 1 && !stats.badges.includes("Mock Master")) {
    newBadges.push("Mock Master"); // First interview
  }
  
  if (newBadges.length > 0) {
    stats.badges = [...new Set([...stats.badges, ...newBadges])];
  }
}

function recordInterview() {
  const stats = getUserStats();
  stats.interviewsTaken++;
  updateStreak(); // Activity counts towards streak
  saveUserStats(stats);
}

/**
 * THEME MANAGEMENT
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = savedTheme === 'dark' ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
  }
}

function handleHomeNav() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    window.location.href = 'dashboard.html';
  } else {
    window.location.href = 'auth.html';
  }
}

// Auto-init theme on every page that includes data.js
document.addEventListener('DOMContentLoaded', initTheme);
