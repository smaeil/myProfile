// Global Variables and objects: ********************************************

const navDropDown = document.querySelector('#nav-dropdown');
const pagesCollection = document.querySelectorAll('.page');
const pages = Array.from(pagesCollection);
let currentPageIndex = 0;

let particleColor = '#eaeaea';

// themeData
const themes = [
    {name: 'light', src: './Assets/themes/light/light.css', particleColor: '#cccccc'}
];

// sounds:
const flipCard = document.querySelector('#flip-card');





// interface control: *******************************************

// nav menu
function toggleDropdown() {
    if (navDropDown.classList.contains('flex')) {
        navDropDown.classList.remove('flex');
    } else {
        navDropDown.classList.add('flex');
    }
}

// Dark mode:

// Language Change:


// recalling the lang from local storage:


// on load:

function onLoad() {

    // setting up the ruler:
    adjustRuler();

}

onLoad();

// navigation: *************************************************

let inMove = false;
async function getPage(pageId) {
    try {

        // checks if the page is in move deactivate the function 
        if (inMove) return;
        inMove = true;

        if (!pageId) {
            return;
        }

        const homeBtn = document.querySelector('#home-btn');

        if (pageId === 'home') {
            homeBtn.classList.add('hide');
        } else {
            homeBtn.classList.remove('hide');
        }


        flipCard.volume = 0.2;
        const targetPage = document.querySelector(`#${pageId}`);
        const targetPageIndex = pages.indexOf(targetPage);
        
        // finding the navigation direction:
        const isForward = targetPageIndex - currentPageIndex > 0 ? true : false;
        // finding the number of steps:
        const steps = Math.abs(targetPageIndex - currentPageIndex);
        
        if (steps === 0) return;
        
        if(isForward) {
            for(let i = 0; i < steps; i++) {
                // setting the currentpage and next page
                const currentPage = pagesCollection[currentPageIndex];
                const nextPage = pagesCollection[currentPageIndex + 1];
    
                nextPage.classList.add('top');
                nextPage.classList.add('cover');
                nextPage.classList.remove('hide');

                // playing the sound
                flipCard.play();
    
                await delay(401);
                currentPage.classList.add('hide');
                nextPage.classList.remove('cover');
                nextPage.classList.remove('top');
    
                // setting the new current page index
                currentPageIndex++;

                // updating scroll spy
                document.querySelector('#scroll-spy').style.width = `${currentPageIndex * 25}%`;


                // resetting the inMove
                inMove = false;

                // updating the history ???
            }
        } else {
            for(let i = 0; i < steps; i++) {
                // setting the currentpage and next page
                const currentPage = pagesCollection[currentPageIndex];
                const nextPage = pagesCollection[currentPageIndex - 1];
    
                nextPage.classList.add('top');
                nextPage.classList.add('uncover');
                nextPage.classList.remove('hide');
                
                // playing the sound
                flipCard.play();
                
                await delay(401);
                currentPage.classList.add('hide');
                nextPage.classList.remove('uncover');
                nextPage.classList.remove('top');
    
                // setting the new current page index
                currentPageIndex--;

                // updating scroll spy
                document.querySelector('#scroll-spy').style.width = `${currentPageIndex * 25}%`;

                //resetting the inMove
                inMove = false;

                // updating the history ???
            }
    
        }

        inMove = false;
    } catch (error) {
        console.log(error);
        inMove = false;
    }
}


// Page contents: ***********************************************

function adjustRuler() {

    // clear the ruler first
    const intervalElements = document.querySelectorAll('.interval');
    intervalElements.forEach(item => item.remove());
    
    // setting up the ruler:
    const width = Math.round(window.innerWidth / 15) ;
    // const width = 140;
    const ruler = document.querySelector('#ruler');

    for(let i = 0; i < width; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('interval');
        ruler.appendChild(newDiv);
    }

}

// core functions: *********************************************

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
// App Listeners: ***********************************************

// closes the menus on click:
window.addEventListener('click', e => {
    if (e.target.classList.contains('menu-btn')) {
        toggleDropdown();
    } else {
        navDropDown.classList.remove('flex');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    adjustRuler();
  });
  
  window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
  });

// a small interval for fixing things
setInterval(() => {
    inMove = false;
},1000);

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

// Initialize and start animation
init();
animate();