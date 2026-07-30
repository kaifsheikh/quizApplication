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
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/* */", "<!-- -->"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pt", ".exe"],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "Which function is used to display output in Python?",
      options: ["echo()", "print()", "display()", "show()"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which function is used to take input from the user?",
      options: ["read()", "input()", "scan()", "get()"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which data type is used to store text?",
      options: ["int", "float", "string", "bool"],
      correct: 2,
      difficulty: "easy"
    },
    {
      question: "Which operator is used for addition?",
      options: ["+", "-", "*", "/"],
      correct: 0,
      difficulty: "easy"
    },
    {
      question: "Which operator checks if two values are equal?",
      options: ["=", "==", "!=", ">"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which keyword is used for a conditional statement?",
      options: ["loop", "if", "when", "check"],
      correct: 1,
      difficulty: "easy"
    },
    {
      question: "Which keyword is used with if when another condition needs to be checked?",
      options: ["else if", "elseif", "elif", "then"],
      correct: 2,
      difficulty: "easy"
    },
    {
      question: "Which loop is commonly used to iterate over a list?",
      options: ["for", "repeat", "loop", "until"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which loop continues running while a condition is True?",
      options: ["for", "while", "repeat", "do"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword exits a loop immediately?",
      options: ["stop", "break", "exit", "continue"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword skips the current iteration of a loop?",
      options: ["skip", "continue", "break", "pass"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which data structure stores multiple values in Python?",
      options: ["List", "Integer", "Float", "Boolean"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which method adds an item to the end of a list?",
      options: ["add()", "append()", "push()", "insertEnd()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "What does len() return?",
      options: [
        "The first value",
        "The number of items",
        "The last value",
        "The data type"
      ],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which function converts a string into an integer?",
      options: ["str()", "int()", "float()", "bool()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword sends a value back from a function?",
      options: ["return", "print", "yield", "send"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "What is the output of print(5 + 3)?",
      options: ["53", "8", "35", "Error"],
      correct: 1,
      difficulty: "easy"
    }
  ]
};