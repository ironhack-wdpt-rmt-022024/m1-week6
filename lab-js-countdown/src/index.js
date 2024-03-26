//****************Variables *******************
const DURATION = 10; // 10 seconds
let remainingTime = DURATION; // Countdown starting from 10
let timerId = null; // Variable to store the interval
let toastId = null;
const startBtnElement = document.querySelector("#start-btn");
const timeElement = document.querySelector("#time");
const toastElement = document.querySelector("#toast");
const closeToastElement = document.querySelector("#close-toast");
const toastMessageElement = document.querySelector("#toast-message");

startBtnElement.addEventListener("click", () => {
  startCountdown();
  startBtnElement.disabled = true;
});
closeToastElement.addEventListener("click", () => {
  toastElement.classList.remove("show");
  clearTimeout(toastId);
});

// ITERATION 2: Start Countdown
function startCountdown() {
  console.log("startCountdown called!");
  showToast("⏰ Final countdown! ⏰");
  timerId = setInterval(() => {
    remainingTime--;
    console.log(remainingTime);
    //this line updates the DOM
    timeElement.innerText = remainingTime;
    if (remainingTime === 5) {
      showToast("Start the engines! 💥");
    }
    if (remainingTime === 0) {
      clearInterval(timerId);
      showToast("Lift off! 🚀");
      startBtnElement.disabled = false;
    }
  }, 1000);
}

// ITERATION 3: Show Toast
function showToast(message) {
  console.log("showToast called!");
  toastElement.classList.add("show");
  toastMessageElement.innerText = message;
  //after three seconds remove the toast card
  toastId = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 3000);
}
