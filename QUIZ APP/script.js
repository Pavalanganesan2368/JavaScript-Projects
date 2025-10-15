// DOM Element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the output of: console.log(typeof null);",
    answers: [
      { text: "'null'", correct: false },
      { text: "'object'", correct: true },
      { text: "'undefined'", correct: false },
      { text: "'number'", correct: false },
    ],
  },
  {
    question: "Which of these is a JavaScript data type?",
    answers: [
      { text: "Float", correct: false },
      { text: "String", correct: true },
      { text: "Decimal", correct: false },
      { text: "Char", correct: false },
    ],
  },
  {
    question: "What will this return? Boolean('');",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "How do you write a function in JavaScript?",
    answers: [
      { text: "function:myFunction()", correct: false },
      { text: "function = myFunction()", correct: false },
      { text: "function myFunction() {}", correct: true },
      { text: "def myFunction():", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "// comment", correct: true },
      { text: "# comment", correct: false },
      { text: "<!-- comment -->", correct: false },
      { text: "/* comment */", correct: false },
    ],
  },
  {
    question: "What does the === operator do?",
    answers: [
      { text: "Assigns a value", correct: false },
      { text: "Compares value and type", correct: true },
      { text: "Compares only value", correct: false },
      { text: "Checks if variable exists", correct: false },
    ],
  },
  {
    question: "Which array method adds an element to the end?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "What is the output of: '5' + 3?",
    answers: [
      { text: "8", correct: false },
      { text: "'53'", correct: true },
      { text: "Error", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: [
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "var", correct: false },
      { text: "constant", correct: false },
    ],
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    answers: [
      { text: "for loop", correct: false },
      { text: "while loop", correct: false },
      { text: "do...while loop", correct: true },
      { text: "if statement", correct: false },
    ],
  },
  {
    question: "What is the result of typeof NaN?",
    answers: [
      { text: "'number'", correct: true },
      { text: "'NaN'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'object'", correct: false },
    ],
  },
  {
    question: "How do you access the first element in an array?",
    answers: [
      { text: "array.first()", correct: false },
      { text: "array[0]", correct: true },
      { text: "array(1)", correct: false },
      { text: "array{0}", correct: false },
    ],
  },
  {
    question: "Which of the following is a falsy value in JavaScript?",
    answers: [
      { text: "'false'", correct: false },
      { text: "0", correct: true },
      { text: "'0'", correct: false },
      { text: "[]", correct: false },
    ],
  },
  {
    question: "Which of these is a valid way to define an arrow function?",
    answers: [
      { text: "let func = () => {}", correct: true },
      { text: "let func() => {}", correct: false },
      { text: "function => func() {}", correct: false },
      { text: "() -> {}", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Digital Ordinance Model", correct: false },
      { text: "Desktop Oriented Model", correct: false },
    ],
  },
  {
    question: "Which function is used to parse JSON?",
    answers: [
      { text: "JSON.decode()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "parse.JSON()", correct: false },
    ],
  },
  {
    question: "What will this output: console.log(2 ** 3);",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is the output of: '10' - 2?",
    answers: [
      { text: "8", correct: true },
      { text: "'102'", correct: false },
      { text: "NaN", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "Which operator can be used to spread elements of an array?",
    answers: [
      { text: "...", correct: true },
      { text: "++", correct: false },
      { text: "**", correct: false },
      { text: "//", correct: false },
    ],
  },
  {
    question: "Which of the following will NOT throw an error?",
    answers: [
      { text: "const x; x = 5;", correct: false },
      { text: "let x = 10; x = 20;", correct: true },
      { text: "const x = 10; x = 20;", correct: false },
      { text: "let x; const y = x = 3.14;", correct: false },
    ],
  },
];


// QUIZ STATE WAS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// START QUIZ

const startQuiz = () => {
    // console.log("Quiz Started");
    // RESET VARIABLES
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion () {
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })

}

function selectAnswer(e) {
    if (answerDisabled) return;
    answerDisabled = true;
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        } 
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults () {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect Score! 🎉";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! 👍";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good Effort! 🙂";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Keep Trying! 😐";
    } else if (percentage >= 20) {
        resultMessage.textContent = "Needs Improvement! 😕";
    } else {
        resultMessage.textContent = "Better Luck Next Time! 😞" ;
    }
}

const restartQuiz = () => {
    // console.log("Restart Quiz");
    resultScreen.classList.remove("active");
    startQuiz();
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);