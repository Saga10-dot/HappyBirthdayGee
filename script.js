const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let texts = []; // Array untuk menyimpan teks setelah ledakan

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.alpha = 1;
    this.exploded = false;
    this.particles = [];
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Warna acak untuk roket

    this.update = function() {
        if (!this.exploded) {
            this.y -= 3;
            if (this.y < canvas.height * 0.5) {
                this.exploded = true;
                for (let i = 0; i < 30; i++) {
                    this.particles.push(new Particle(this.x, this.y));
                }
            }
        }
        this.draw();
    };

    this.draw = function() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color; // Gunakan warna acak
            ctx.fill();
        } else {
            this.particles.forEach(p => p.update());
        }
    };
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Warna acak untuk partikel

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.draw();
    };

    this.draw = function() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    };
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((fw, index) => {
        fw.update();
        if (fw.exploded && fw.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
            tampilkanTeks(fw.x, fw.y);
        }
    });
    
    // Render teks dan buat memudar perlahan
    texts.forEach((text, index) => {
        ctx.globalAlpha = text.alpha;
        ctx.font = "40px Arial";
        ctx.fillStyle = text.color;
        ctx.textAlign = "center";
        ctx.fillText("Happy Birthday Gee <3", text.x, text.y);
        ctx.globalAlpha = 1;
        
        text.alpha -= 0.01; // Memudarkan teks perlahan
        if (text.alpha <= 0) {
            texts.splice(index, 1);
        }
    });
    
    requestAnimationFrame(render);
}

function tampilkanTeks(x, y) {
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Warna acak untuk teks
    texts.push({ x, y, color, alpha: 1 }); // Tambahkan teks dengan efek fade
}

function mulaiKembangApi() {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
}

render();
