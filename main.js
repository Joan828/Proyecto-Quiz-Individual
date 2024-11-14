const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const scoreDivElement = document.getElementById("scoreDiv");
const finalScoreElement = document.getElementById("finalScore");
let questions
let score = 0
let correctAnswer = ""
let correctA = false
let answers = []

axios.get("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")  
 .then((res) => {
   questions = res.data.results
   
  })      
 .catch((err) => console.error(err));

let currentQuestionIndex;

function startGame() { 
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  showScore();
} 

function setStatusClass(element) {

  if (element.getAttribute("questionType") == "correct") {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer(correctA) {
  console.log(correctA);
  if(correctA == true){
    score++;
    console.log(score);
    showScore()
    correctA = false;
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    finalScoreElement.innerHTML = "Tu puntuación final es: ";
    finalScoreElement.classList.remove("hide");
  }
}

function showQuestion(question) {
  //Pinta la pregunta
  questionElement.innerHTML = "<div class=''>" + question.question + "</div>";
  correctAnswer = question.correct_answer
  answers = [...question.incorrect_answers]
  answers.push(correctAnswer)
  shuffle(answers)
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer
    if(answer === correctAnswer){
      button.setAttribute("questionType", "correct")
      correctA = true
      button.addEventListener("click", () => selectAnswer(correctA));
    }else{
      button.addEventListener("click", selectAnswer);
    }

    answerButtonsElement.append(button);

  })

}

function resetState() {
  nextButton.classList.add("hide");
  finalScoreElement.classList.add("hide");
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

function showScore() {
  scoreElement.innerHTML = score + "/5";
  scoreDivElement.classList.remove("hide"); 
  scoreDivElement.classList.add("d-flex"); 
  scoreDivElement.classList.add("justify-content-around");
}
