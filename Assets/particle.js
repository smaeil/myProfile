// Particale sections: *********************************************************
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// setting the mouse properties
let mouse = {
    x: null,
    y: null,
    radius: (canvas.width / 80) * (canvas.height / 80)
};

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;

});

// Particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = particleColor;
    ctx.fill();
  }

  // Update particle position
  update() {
    // Bounce off edges
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    // collision detection / mouse and particle detection
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt( dx**2 + dy**2 );
    if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 4;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 4;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 4;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 4;
        }
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // Redraw particle
    this.draw();
  }
}

// Create particles
const particles = [];
function init() {
  particles.length = 0; // Clear existing particles
  const numberOfParticles = (canvas.height * canvas.width) / 9000; // Adjust density

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1; // Random size between 1 and 3
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const directionX = (Math.random() * 0.4) - 0.2; // Random X direction
    const directionY = (Math.random() * 0.4) - 0.2; // Random Y direction
    const color = '#ffffff'; // Particle color

    particles.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Update and draw all particles
  particles.forEach(particle => particle.update());

  // draw lines
  connectParticle();
}


// connecting the close enought particles
const lineFactor = 12; // Factor of connectivity for the lines the lower the more connections
function connectParticle() {
    for (let a = 0 ; a < particles.length ; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) ** 2) + ((particles[a].y - particles[b].y) ** 2);
            if (distance < (canvas.width / lineFactor) * (canvas.height / lineFactor)) {
                ctx.strokeStyle = particleColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x , particles[b].y);
                ctx.stroke();
            }
        }
    }
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});


// Initialize and start animation
init();
