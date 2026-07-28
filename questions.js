/* =========================================================
   PYTHON QUIZ QUESTIONS
   Edit this file to change/add questions. Loaded directly by
   quiz.html via <script src="questions.js"> — works even when
   you just double-click quiz.html, no server needed.

   Each question needs:
     question   -> string
     options    -> array of 4 strings
     correct    -> index (0-3) of the right option
     difficulty -> "easy" | "medium" | "hard"
   ========================================================= */
const QUIZ_DATA = {
  title: "Python Quiz",
  subtitle: "Easy, medium aur hard — mix of Python questions. Answer before the ring runs out.",
  secondsPerQuestion: 20,
  questions: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which of these is used to create a comment in Python?",
      options: ["//", "<!-- -->", "#", "/* */"],
      correct: 2,
      difficulty: "easy"
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".pt", ".py", ".pyt", ".pyth"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which data type is immutable in Python?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      correct: 3,
      difficulty: "easy"
    },
    {
      question: "What will len('Python') return?",
      options: ["5", "6", "7", "Error"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "What is the output of 3 // 2 in Python?",
      options: ["1.5", "1", "2", "Error"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which method adds an item to the end of a list?",
      options: ["list.add()", "list.append()", "list.insert()", "list.push()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "What does the self keyword represent in a Python class?",
      options: [
        "A reference to the class itself",
        "A reference to the current instance of the class",
        "A built-in Python module",
        "A static variable"
      ],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which of the following creates a virtual environment in Python?",
      options: ["python -env", "python -m venv env", "pip venv env", "python create venv"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "What is the output of list(range(2, 10, 3))?",
      options: ["[2, 5, 8]", "[2, 3, 4]", "[2, 5, 8, 10]", "[3, 6, 9]"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "What does the yield keyword do in Python?",
      options: [
        "Ends a function immediately",
        "Turns a function into a generator that returns values lazily",
        "Raises an exception",
        "Declares a global variable"
      ],
      correct: 1,
      difficulty: "hard"
    },
    {
      question: "What is the average time complexity of looking up a key in a Python dictionary?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correct: 2,
      difficulty: "hard"
    },
    {
      question: "What will [x for x in range(5) if x % 2 == 0] produce?",
      options: ["[0, 2, 4]", "[1, 3]", "[0, 1, 2, 3, 4]", "[2, 4]"],
      correct: 0,
      difficulty: "hard"
    },
    {
      question: "What does Python's GIL (Global Interpreter Lock) primarily restrict?",
      options: [
        "Multiple processes from running at once",
        "Only one thread from executing Python bytecode at a time",
        "Access to global variables",
        "Import of external modules"
      ],
      correct: 1,
      difficulty: "hard"
    },
    {
      question: "What is the output of sum([1, 2, 3], -6)?",
      options: ["6", "0", "-6", "Error"],
      correct: 1,
      difficulty: "hard"
    }
  ]
};