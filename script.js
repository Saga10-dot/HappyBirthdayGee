/* JavaScript - script.js */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function showBirthdayMessage() {
    const message = document.getElementById("birthdayMessage");
    message.style.opacity = "1";
    setTimeout(() => {
        message.style.opacity = "0";
    }, 5000); // Tampilkan selama 5 detik
}

function createFirework(x, y) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    setTimeout(showBirthdayMessage, 1000);
}

canvas.addEventListener("click", (event) => {
    createFirework(event.clientX, event.clientY);
});