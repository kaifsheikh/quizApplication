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
    },
        {
      question: "Which method removes the last item from a list?",
      options: ["remove()", "delete()", "pop()", "clear()"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which function returns the type of a variable?",
      options: ["type()", "typeof()", "kind()", "class()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to create a class in Python?",
      options: ["object", "class", "define", "new"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to handle exceptions?",
      options: ["catch", "try", "handle", "except"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which block is executed if an exception occurs?",
      options: ["finally", "except", "catch", "error"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to import a module?",
      options: ["include", "using", "import", "require"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which module is commonly used for mathematical operations?",
      options: ["math", "random", "os", "time"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which module is used to generate random numbers?",
      options: ["math", "random", "os", "time"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which method converts all characters in a string to uppercase?",
      options: ["upper()", "uppercase()", "toUpper()", "capital()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which method converts all characters in a string to lowercase?",
      options: ["lower()", "lowercase()", "toLower()", "small()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which method removes whitespace from both ends of a string?",
      options: ["trim()", "strip()", "remove()", "clean()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to create an anonymous function?",
      options: ["func", "lambda", "anonymous", "def"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which function sorts a list and returns a new sorted list?",
      options: ["sort()", "order()", "sorted()", "arrange()"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which list method sorts the original list?",
      options: ["sorted()", "sort()", "arrange()", "order()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which function returns the largest value in a list?",
      options: ["largest()", "max()", "high()", "top()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which function returns the smallest value in a list?",
      options: ["lowest()", "small()", "min()", "least()"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to define a generator function?",
      options: ["return", "yield", "generate", "next"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which function is used to open a file?",
      options: ["file()", "open()", "read()", "load()"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which mode is used to read a file?",
      options: ["r", "w", "a", "x"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which mode is used to append data to a file?",
      options: ["r", "w", "a", "x"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which keyword is used to inherit from another class?",
      options: ["extends", "inherits", "()", "super"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which function converts a value to a float?",
      options: ["float()", "decimal()", "real()", "number()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which built-in function returns a sequence of numbers?",
      options: ["range()", "list()", "seq()", "numbers()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "//", "%"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which operator returns the remainder after division?",
      options: ["/", "//", "%", "**"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which operator performs floor division?",
      options: ["/", "//", "%", "**"],
      correct: 1,
      difficulty: "medium"
    },
    {
      question: "Which collection stores unique values only?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which collection stores key-value pairs?",
      options: ["List", "Tuple", "Dictionary", "Set"],
      correct: 2,
      difficulty: "medium"
    },
    {
      question: "Which dictionary method returns all keys?",
      options: ["keys()", "values()", "items()", "getKeys()"],
      correct: 0,
      difficulty: "medium"
    },
    {
      question: "Which dictionary method returns all values?",
      options: ["keys()", "values()", "items()", "getValues()"],
      correct: 1,
      difficulty: "medium"
    }
  ]
};