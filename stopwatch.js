let timer = null;
let startTime = 0;
let elapsed = 0;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsed;

  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsed = 0;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
