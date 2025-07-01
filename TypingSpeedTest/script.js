const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');

let timer = 60;
let interval;
let typedChars = 0;
let correctChars = 0;
let started = false;

const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a skill that improves with practice.",
  "Frontend development includes HTML, CSS, and JavaScript.",
  "Consistency and focus are the keys to mastering coding."
];

let currentParagraph = "";

function startTest() {
  timer = 60;
  typedChars = 0;
  correctChars = 0;
  started = false;
  textInput.disabled = false;
  textInput.value = "";
  timerEl.textContent = timer;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 100;

  currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textDisplay.innerText = currentParagraph;

  clearInterval(interval);
}

textInput.addEventListener("input", () => {
  if (!started) {
    started = true;
    interval = setInterval(updateTimer, 1000);
  }

  const inputText = textInput.value;
  typedChars = inputText.length;
  let correct = 0;

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === currentParagraph[i]) correct++;
  }

  correctChars = correct;

  const accuracy = Math.floor((correctChars / typedChars) * 100) || 0;
  accuracyEl.textContent = accuracy;

  const words = inputText.trim().split(/\s+/).length;
  const timeSpent = 60 - timer;
  const wpm = timeSpent > 0 ? Math.floor((words / timeSpent) * 60) : 0;
  wpmEl.textContent = wpm;
});

function updateTimer() {
  timer--;
  timerEl.textContent = timer;
  if (timer <= 0) {
    clearInterval(interval);
    textInput.disabled = true;
  }
}

startTest();
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Change button text
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Toggle Light Mode";
  } else {
    themeToggle.textContent = "Toggle Dark Mode";
  }
});

