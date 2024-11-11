const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let questions
let score = 0
let correctAnswer = ""
let answers = []

axios.get("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")  
 .then((res) => {
   questions = res.data.results
   console.log(questions);
   
  })      
 .catch((err) => console.error(err));

let currentQuestionIndex;

function startGame() {
  answers = []
  correctAnswer = ""
  console.log("Answers:", answers);
  
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
} 

function setStatusClass(element) {

  if (element.getAttribute("questionType") == "correct") {
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
  //Pinta la pregunta
  questionElement.innerText = question.question;
  correctAnswer = question.correct_answer
  answers = [...question.incorrect_answers]
  answers.push(correctAnswer)
  shuffle(answers)
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer
    if(answer === correctAnswer){
      button.setAttribute("questionType", "correct")
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.append(button);

  })

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

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
