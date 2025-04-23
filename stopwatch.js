let timerInterval = null;
let elapsedTime = 0;
let running = false;
let startTime = 0;

function timeToString(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0')
  );
}

function updateDisplay() {
  document.getElementById("display").textContent = timeToString(elapsedTime);
}

function start() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000);
  }
}

function stop() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);