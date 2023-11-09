const quizData = [
  {
    question: "What is the capital of France?",
    a: "Paris",
    b: "London",
    c: "Berlin",
    d: "Madrid",
    correct: "a",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    a: "Mars",
    b: "Mercury",
    c: "Venus",
    d: "Jupiter",
    correct: "a",
  },
  {
    question: "What is the largest planet in our solar system?",
    a: "Jupiter",
    b: "Mars",
    c: "Venus",
    d: "Saturn",
    correct: "a",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    a: "Brazil",
    b: "Germany",
    c: "Argentina",
    d: "France",
    correct: "d",
  },
  {
    question: "What is the chemical symbol for sodium?",
    a: "So",
    b: "Na",
    c: "Sd",
    d: "Si",
    correct: "b",
  },
];

const answerEls = document.querySelectorAll(".answer");
const answerLiEls = document.querySelectorAll("li");
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("next");
const resultContainer = document.getElementById("result");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  nextBtn.classList.add("disabled");
  deselectAnswer();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
    changeBgColor();
  });
}

nextBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz > quizData.length - 2) {
      nextBtn.innerText = "Finished";
    }
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResults();
    }
  }
});

// This allows users to click anywhere on the <li> element to check the radio button
answerLiEls.forEach((answerLiEl) => {
  answerLiEl.addEventListener("click", () => {
    const inputEl = answerLiEl.querySelector("input");
    inputEl.checked = true;
    changeBgColor();
    nextBtn.classList.remove("disabled");
  });
});

// change background color when user select an answer
function changeBgColor() {
  answerLiEls.forEach((answerLiEl) => {
    const inputEl = answerLiEl.querySelector("input");

    if (inputEl.checked) {
      answerLiEl.style.backgroundColor = "#A6B7F6";
      answerLiEl.style.borderColor = "#6c92fa";
    } else {
      answerLiEl.style.backgroundColor = "";
      answerLiEl.style.borderColor = "";
    }
  });
}

function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  if (score === quizData.length) {
    message =
      "Congratulations! You answered all the questions correctly. Great job!";
  } else if (score >= quizData.length / 2) {
    message = `Well done! You answered more than half of the questions correctly. Keep up the good work!`;
  } else {
    message = `Keep practicing! You can improve your score.`;
  }

  resultContainer.innerHTML = `
      <h1>Your Quiz Result</h1>
      <p>${message}</p>
      <p>You answered <span>${score}/${quizData.length}</span> questions correctly.</p>
      <div class="restartBtnDiv">
      <button class="restartBtn" onclick="location.reload()">Restart Quiz</button></div>
    `;
}
