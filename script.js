const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let texts = [];
let flowers = [];
let confetti = [];

function Firework(x, y, type) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.alpha = 1;
    this.exploded = false;
    this.particles = [];
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.explosionHeight = Math.random() * (canvas.height * 0.5) + canvas.height * 0.3;
    this.type = type;

    this.update = function() {
        if (!this.exploded) {
            this.y -= 3;
            if (this.y < this.explosionHeight) {
                this.exploded = true;
                for (let i = 0; i < 30; i++) {
                    this.particles.push(new Particle(this.x, this.y));
                }
                if (this.type === "text") {
                    tampilkanTeks(this.x, this.y);
                } else if (this.type === "flower") {
                    tampilkanBunga(this.x, this.y);
                }
                tambahkanKonfeti(this.x, this.y);
            }
        }
        this.draw();
    };

    this.draw = function() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
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
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

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
        }
    });
    
    texts.forEach((text, index) => {
        ctx.globalAlpha = text.alpha;
        ctx.font = "40px Arial";
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 80%)`;
        ctx.textAlign = "center";
        ctx.fillText("Happy Birthday Gee <3", text.x, text.y);
        ctx.globalAlpha = 1;
        
        text.alpha -= 0.01;
        if (text.alpha <= 0) {
            texts.splice(index, 1);
        }
    });
    
    flowers.forEach((flower, index) => {
        ctx.globalAlpha = flower.alpha;
        for (let i = 0; i < 10; i++) {
            let angle = i * (Math.PI / 5);
            let petalX = flower.x + Math.cos(angle) * 50;
            let petalY = flower.y + Math.sin(angle) * 50;

            ctx.beginPath();
            ctx.arc(petalX, petalY, 20, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
            ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(flower.x, flower.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        
        flower.alpha -= 0.01;
        if (flower.alpha <= 0) {
            flowers.splice(index, 1);
        }
    });
    
    confetti.forEach((c, index) => {
        ctx.globalAlpha = c.alpha;
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, 5, 5);
        ctx.globalAlpha = 1;
        
        c.y += c.speed;
        c.alpha -= 0.01;
        
        if (c.alpha <= 0) {
            confetti.splice(index, 1);
        }
    });
    
    requestAnimationFrame(render);
}

function tampilkanTeks(x, y) {
    texts.push({ x, y, alpha: 1 });
}

function tampilkanBunga(x, y) {
    flowers.push({ x, y, alpha: 1 });
}

function tambahkanKonfeti(x, y) {
    for (let i = 0; i < 50; i++) {
        confetti.push({
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            speed: Math.random() * 2 + 1,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function mulaiKembangApi() {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, "text"));
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, "flower"));
}

render();
