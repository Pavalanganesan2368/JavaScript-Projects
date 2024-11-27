const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const pauseBtn = document.querySelector("#pauseBtn");

let Hours = 0;
let Minutes = 0;
let Seconds = 0;
let intervalId = null;

function getTimer() {
  Seconds++;
  if (Seconds === 60) {
    Seconds = 0;
    Minutes++;
    if (Minutes === 60) {
      Minutes = 0;
      Hours++;
    }
  }
  timer.textContent = `${String(Hours).padStart(2, "0")}:${String(Minutes).padStart(2, "0")}:${String(Seconds).padStart(2, "0")}`;
}

startBtn.addEventListener("click", function() {
  if (!intervalId) {
    intervalId = setInterval(getTimer, 16);
  }
});

resetBtn.addEventListener("click", function() {
  clearInterval(intervalId);
  intervalId = null;
  Hours = 0;
  Minutes = 0;
  Seconds = 0;
  timer.textContent = "00:00:00";
});

pauseBtn.addEventListener("click", function() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});