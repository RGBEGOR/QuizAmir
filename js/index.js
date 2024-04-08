// "use strict";
// alert("Hey, NobleBlack");

const questionText = document.getElementsByClassName("question-text")[0];
let optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const seeResultBtn = document.querySelector(".see-result-btn");
const correctAnswer = document.querySelector(".correct-answers");
let remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const quizHomeBox = document.querySelector(".quiz-home-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
let goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];

let interval;
// Questions, Options and Answers array with Description
myApp = [
  {
    question: "Настоящее имя одного из величайших полководцев в мировой истории — Тимур ибн:",
    options: ["Чингиз", "Тарагай Барлас", "Шейх Мансур", "Мухаммад"],
    answer: 1,
    // description: "",
  },
  
  {
    question: "Какую страну так и не успел покарить Амир Тимур в своих долгих походах",
    options: ["Китай", "Турцию", "Иран", "Индию"],
    answer: 0,
    // description: "",
  },
  
  {
    question: "Со времён Чингисхана титул великого хана могли носить только чингизиды. Именно поэтому Тимур формально носил титул (вождя):",
    options: ["Шейха", "Султана", "Эмира", "Хана"],
    answer: 2,
    // description: "",
  },
  
  {
    question: " 9 апреля 1336 года в селении Ходжа-Ильгар близ города ... родился Амир Тимур ",
    options: ["Турхан Бухара", "Ходжа Ильгар Шахризабс", "Ниса Ашхабад", "Герат Афганистан"],
    answer: 1,
    // description: "",
  },
  
  {
    question: "Где и когда умер Амир Тимур:",
    options: ["1405 год Отрар", "1403 год Анкара", "1339 год Кеш", "никто не знает"],
    answer: 0,
    // description: "",
  },
  {
    question: "Мавзолей Гур Эмир находиться в городе",
    options: ["Шахризабс", "Бухара", "Самарканд", "Хива"],
    answer: 2,
    // description: "",
  },
  {
    question: "Период(годы) правления Амира Тимура",
    options: ["1336-1405", "не помню", "1370-1405", "1370-1467"],
    answer: 2,
    // description: "",
  },
  {
    question: "Сколько сыновей было у Амира Тимура",
    options: ["пять", "два", "четыре", "несколько"],
    answer: 2,
    // description: "",
  },
  {
    question: "Поход Амира Тимура  на эту страну принес ему величайшую славу защитника и освободителя Европы  :",
    options: ["Персидская империя", "Османская империя", "Арабский Халифат", "Испанию"],
    answer: 1,
    // description: "",
  },
  {
    question: "Что вручили на курултае полкаводцев в 1370 году шейх Мирза Амиру тиму в знак принания власти ",
    options: ["Барабан и знамя", "Зубную щетку", "меч и щит", "ковер"],
    answer: 0,
    // description: "",
  },
  
];

function load() {
  //   console.log("hey Abhishek !!!");
  //   console.log(number);
  number++;
  //   console.log(number);
  questionText.innerHTML = myApp[myArray[questionIndex]].question;
  createOptions();
  scoreBoard();
  currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
  optionBox.innerHTML = "";
  let animationDelay = 0.2;
  for (let i = 0; i < myApp[myArray[questionIndex]].options.length; i += 1) {
    // console.log(myApp[questionIndex].options[i]);
    const option = document.createElement("div");
    option.innerHTML = myApp[myArray[questionIndex]].options[i];
    // Now setting attribute for class
    // option.setAttribute("class", "option");
    option.classList.add("option");
    option.id = i;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.2;

    // option.setAttribute("onclick", "check(this)");
    option.addEventListener("click", function () {
      // check(this) === check(option)
      check(this);
    });
    optionBox.appendChild(option);
  }
}

function check(option) {
  //   console.log(option.innerHTML);
  attempt++;
  const id = option.id;
  if (id == myApp[myArray[questionIndex]].answer) {
    console.log("correct");
    option.classList.add("correct");
    score += 1;
    scoreBoard();
  } else {
    console.log("Wrong");
    option.classList.add("wrong");
    for (let i = 0; i < optionBox.children.length; i++) {
      if (optionBox.children[i].id == myApp[myArray[questionIndex]].answer) {
        optionBox.children[i].classList.add("show-correct");
      }
    }
  }
  disableOptions();
  showAnswerDescription();
  showNextQuestionBtn();
  stopTimer();

  if (number == myApp.length) {
    console.log("Quiz Over Mate !!!");
    quizOver();
  }
}

function quizResult() {
  document.querySelector(".total-questions").innerHTML = myApp.length;
  document.querySelector(".total-attempt").innerHTML = attempt;
  document.querySelector(".total-correct").innerHTML = score;
  document.querySelector(".total-wrong").innerHTML = attempt - score;
  const percentage = (score / myApp.length) * 100;
  document.querySelector(".total-percentage").innerHTML =
    percentage.toFixed(2) + "%";
}

function resetQuiz() {
  attempt = 0;
  questionIndex = 0;
  score = 0;
  number = 0;
  // myArray = [];
  // myArray = randomeArrayGenerator();
  // console.log(myArray);
  answerDescription.classList.remove("show");
  // startTimer();
  // load();
}

function quizOver() {
  // quizBox.classList.remove("show");
  nextQuestionBtn.classList.remove("show");
  seeResultBtn.classList.add("show");
}

function timeIsUp() {
  showTimeUpText();
  // timeUpText.classList.add("show");
  // when time is up, show the correct output
  for (let i = 0; i < optionBox.children.length; i++) {
    if (optionBox.children[i].id == myApp[myArray[questionIndex]].answer) {
      optionBox.children[i].classList.add("show-correct");
    }
  }
  disableOptions();
  showAnswerDescription();
  if (number != myApp.length) {
    showNextQuestionBtn();
  } else {
    timeUpText.classList.remove("show");
    quizOver();
  }
  // stopTimer();
}

function startTimer() {
  let timeLimit = 15;
  remainingTime.innerHTML = timeLimit;
  remainingTime.classList.remove("less-time");

  interval = setInterval(() => {
    timeLimit--;
    // console.log(timeLimit);
    if (timeLimit < 10) {
      timeLimit = "0" + timeLimit;
    }
    if (timeLimit < 6) {
      remainingTime.classList.add("less-time");
    }
    remainingTime.innerHTML = timeLimit;
    if (timeLimit == 0) {
      clearInterval(interval);
      timeIsUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function disableOptions() {
  for (let i = 0; i < optionBox.children.length; i++) {
    // console.log(optionBox.children[i].id);
    // console.log(optionBox.childElementCount);
    // optionBox.children[i].removeAttribute("onclick");
    optionBox.children[i].classList.add("already-answered");
  }
}

function showAnswerDescription() {
  // we will only print description, when there is any predefined exist, otherwise it won't print anything.
  if (typeof myApp[myArray[questionIndex]].description !== "undefined") {
    answerDescription.classList.add("show");
    answerDescription.innerHTML = myApp[myArray[questionIndex]].description;
  }
}

function hideAnswerDescription() {
  answerDescription.classList.remove("show");
  answerDescription.innerHTML = "";
}

function showNextQuestionBtn() {
  nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn() {
  nextQuestionBtn.classList.remove("show");
}

function showTimeUpText() {
  timeUpText.classList.add("show");
}

function hideTimeUpText() {
  timeUpText.classList.remove("show");
}

function scoreBoard() {
  correctAnswer.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  console.log("Abhishek");
  questionIndex++;
  load();
  hideNextQuestionBtn();
  hideAnswerDescription();
  hideTimeUpText();
  startTimer();
}

function randomeArrayGenerator() {
  set = new Set();
  for (let i = 0; set.size != myApp.length; i += 1) {
    set.add(Math.floor(Math.random() * myApp.length));
  }
  return Array.from(set);
}

seeResultBtn.addEventListener("click", () => {
  console.log("See Result Button");
  // quizBox.style.display = "none";
  quizBox.style.display = "none";
  seeResultBtn.classList.remove("show");
  quizOverBox.classList.add("show");
  quizResult();
});

startAgainQuizBtn.addEventListener("click", () => {
  quizBox.classList.add("show");
  quizBox.style.display = "block";
  quizOverBox.classList.remove("show");
  resetQuiz();
  // myArray = [];
  // myArray = randomeArrayGenerator();
  // console.log(myArray);
  // answerDescription.classList.remove("show");
  // startTimer();
  // load();
  // nextQuestion();
  quizStart();
});

goHomeBtn.addEventListener("click", () => {
  quizOverBox.classList.remove("show");
  quizHomeBox.classList.add("show");
  resetQuiz();
});

startQuizBtn.addEventListener("click", quizStart);

function quizStart() {
  quizHomeBox.classList.remove("show");
  // quizBox.classList.add("show");
  quizBox.style.display = "block";
  myArray = randomeArrayGenerator();
  console.log(myArray);
  startTimer();
  load();
}

// window.onload = () => {
//   myArray = randomeArrayGenerator();
//   console.log(myArray);
//   startTimer();
//   load();
// };
