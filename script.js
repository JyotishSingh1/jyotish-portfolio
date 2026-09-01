/* =====================================================
   PORTFOLIO NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showLinkedInMessage(event) {

    event.preventDefault();

    alert("Your LinkedIn profile link will be added here.");
}


/* =====================================================
   CYBERPUNK ANIMATED BACKGROUND
===================================================== */

const canvas = document.getElementById("cyberpunk-bg");

const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 120
};


/* =====================================================
   CANVAS SIZE
===================================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    createParticles();
}


window.addEventListener("resize", resizeCanvas);


/* =====================================================
   MOUSE MOVEMENT
===================================================== */

window.addEventListener("mousemove", function(event) {

    mouse.x = event.x;

    mouse.y = event.y;

});


window.addEventListener("mouseout", function() {

    mouse.x = null;

    mouse.y = null;

});


/* =====================================================
   PARTICLE
===================================================== */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = (Math.random() - 0.5) * 0.5;

        this.speedY = (Math.random() - 0.5) * 0.5;

        this.opacity = Math.random() * 0.7 + 0.2;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        /* Bounce from screen edges */

        if (this.x < 0 || this.x > canvas.width) {

            this.speedX *= -1;

        }


        if (this.y < 0 || this.y > canvas.height) {

            this.speedY *= -1;

        }


        /* Mouse interaction */

        if (mouse.x !== null && mouse.y !== null) {

            const dx = this.x - mouse.x;

            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);


            if (distance < mouse.radius) {

                const force =
                    (mouse.radius - distance) /
                    mouse.radius;

                const directionX = dx / distance;

                const directionY = dy / distance;


                this.x += directionX * force * 2;

                this.y += directionY * force * 2;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(185, 103, 255, ${this.opacity})`;

        ctx.shadowBlur = 10;

        ctx.shadowColor = "#9d4edd";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


/* =====================================================
   CREATE PARTICLES
===================================================== */

function createParticles() {

    particles = [];

    const particleCount =
        Math.min(
            Math.floor(
                (canvas.width * canvas.height) / 12000
            ),
            130
        );


    for (let i = 0; i < particleCount; i++) {

        particles.push(
            new Particle()
        );

    }

}


/* =====================================================
   CONNECT PARTICLES
===================================================== */

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 130) {

                const opacity =
                    1 - distance / 130;


                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(120, 70, 180, ${opacity * 0.35})`;

                ctx.lineWidth = 0.7;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


/* =====================================================
   ANIMATION LOOP
===================================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(function(particle) {

        particle.update();

        particle.draw();

    });


    connectParticles();


    requestAnimationFrame(animate);

}


/* =====================================================
   START
===================================================== */

resizeCanvas();

animate();

/* =====================================================
   CUSTOM CYBERPUNK CURSOR
===================================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;


/* ================= MOUSE POSITION ================= */

document.addEventListener("mousemove", function(event) {

    cursorX = event.clientX;
    cursorY = event.clientY;

    cursorDot.style.left = cursorX + "px";
    cursorDot.style.top = cursorY + "px";

});


/* ================= SMOOTH RING ================= */

function animateCursor() {

    ringX += (cursorX - ringX) * 0.15;
    ringY += (cursorY - ringY) * 0.15;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* ================= HOVER EFFECT ================= */

const interactiveElements =
    document.querySelectorAll(
        "button, a, .project-card, .achievement-card"
    );


interactiveElements.forEach(function(element) {

    element.addEventListener("mouseenter", function() {

        cursorRing.classList.add("hovering");

        cursorDot.classList.add("hovering");

    });


    element.addEventListener("mouseleave", function() {

        cursorRing.classList.remove("hovering");

        cursorDot.classList.remove("hovering");

    });

});
