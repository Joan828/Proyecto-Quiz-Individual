const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// console.log(startButton,nextButton,questionContainerElement,questionElement,answerButtonsElement)

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: false },
      { text: "Both are correct", correct: true },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false }, //answer
      { text: "8", correct: true },
      { text: "Yes", correct: false },
    ],
  },
];

let currentQuestionIndex;

function startGame() {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setStatusClass(element) {
  if (element.dataset.correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function showQuestion(question) {
  //pinta la pregunta
  questionElement.innerText = question.question;
  //pintamos los botones de respuesta
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    //si el boton es la respuesta correcta le añadimos un atributo correct
    if (answer.correct === true) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.append(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  answerButtonsElement.innerHTML = "";
}

function setNextQuestion() {
    resetState()
  showQuestion(questions[currentQuestionIndex]);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});