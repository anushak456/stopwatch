let timer;
let isRunning = false;
let time = 0;
const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10); // Only show two digits for milliseconds

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
}

function updateDisplay() {
    display.innerText = formatTime(time);
}

document.getElementById("start").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        let startTime = Date.now() - time;
        timer = setInterval(() => {
            time = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
});

document.getElementById("pause").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    time = 0;
    updateDisplay();
    laps.innerHTML = ""; // Clear lap list
});

document.getElementById("lap").addEventListener("click", () => {
    if (isRunning) {
        const li = document.createElement("li");
        li.innerText = formatTime(time);
        laps.appendChild(li);
    }
});

// Initialize display on page load
updateDisplay();