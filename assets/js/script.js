// Srollbar & Navbar scroll
let progressScrollbar = document.querySelector('.progress-scrollbar')
let totalHeight = document.body.scrollHeight - window.innerHeight

window.onscroll = function() {

    let progressHeight = (window.pageYOffset / totalHeight) * 100
    progressScrollbar.style.height = progressHeight + '%'


}


// Scroll Up
const scrollUp = () => {
    const scrollUp = document.querySelector('.scroll__up')

    if(this.scrollY >= 200) {
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
}

window.addEventListener('scroll', scrollUp)


// Navbar GSAP
gsap.registerPlugin(Flip)

const links = document.querySelectorAll('.navbar__item a')
const activeNavbar = document.querySelector('.navbar__active')

links.forEach(link => {

    link.addEventListener('click', e => {
        gsap.to(links, {color: 'hsl(0, 0%, 99%'})

        if(document.activeElement === link) {
            gsap.to(link, {color: 'hsl(208, 100%, 50%)'})
        }

        const state = Flip.getState(activeNavbar)
        link.appendChild(activeNavbar)
        
        Flip.from(state, {duration: 1.25, absolute: true, ease: 'elastic.out(1, 0.5)'})

    })

})


// CTA GSAP
const timeline = gsap.timeline()

timeline.from(".image__box", 1, {
    y: -100,
    opacity: 0,
    stagger: .2
})

gsap.timeline({
    scrollTrigger: {
        trigger: '.cta__content',
        start: 'top top',
        scrub: 1
    }
})
.to('.image__overlay', {
    height: '105%', 
    ease: Expo.easeOut
}, 'start')
.to('.image__box', {
    ease: Expo.ease
}, 'start')



// Scroll Reveal Animation
const scrollReveal = ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 100,
    // reset: true
})


scrollReveal.reveal(`.home__left, .home__title, .home__text`, {origin: 'left', delay: 100, interval: 200})
scrollReveal.reveal(`.home__image`, {origin: 'right', delay: 200})


// Hero
let maxParticles = 2500;
let particles = [];
let frequency = 10;
let initNum = maxParticles;
let maxTime = frequency * maxParticles;
let timeToRecreate = false;
let hero = document.querySelector('.hero')

// Enable repopulate
setTimeout(function () {
    timeToRecreate = true;
}, maxTime);

// Populate particles
populate(maxParticles);

let screem = document.createElement('canvas');
screem.width = window.innerWidth;
screem.height = window.innerHeight;
hero.append(screem);

let canvas = screem.getContext('2d');

class Particle {
  constructor(canvas) {
    let random = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    this.point_of_attraction = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    if (Math.random() > 0.5) {
      this.x = window.innerWidth * Math.random();
      this.y = Math.random() > 0.5 ? -Math.random() - 10 : window.innerHeight + Math.random() + 10;
    } else {
      this.x = Math.random() > 0.5 ? -Math.random() - 10 : window.innerWidth + Math.random() + 10;
      this.y = window.innerHeight * Math.random();
    }

    this.s = Math.random() * 2;
    this.a = 0;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.radius = random > 0.2 ? Math.random() * 1 : Math.random() * 3;
    // this.color = random > 0.2 ? "hsl(0, 0%, 100%)" : "hsl(208, 100%, 50%)";
    this.radius = random > 0.8 ? Math.random() * 2.2 : this.radius;
    this.color = random > 0.8 ? "hsl(174, 100%, 50%)" : this.color;
  }

  calculateDistance(v1, v2) {
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt(x * x + y * y);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    let p1 = {
      x: this.x,
      y: this.y
    };

    let distance = this.calculateDistance(p1, this.point_of_attraction);
    let force = Math.max(10, 1 + distance);

    let attr_x = (this.point_of_attraction.x - this.x) / force;
    let attr_y = (this.point_of_attraction.y - this.y) / force;

    this.x += Math.cos(this.a) * this.s + attr_x;
    this.y += Math.sin(this.a) * this.s + attr_y;
    this.a += Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2;

    if (distance < 30 + Math.random() * 10) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

function populate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(
      function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas));
        };
      }(i),
      frequency * i
    );
  }
  return particles.length;
}

function createSphere() {
  let radius = 180;
  let center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
}

function clear() {
  canvas.globalAlpha = 0.08;
  canvas.fillStyle = '#02051D';
  canvas.fillRect(0, 0, screem.width, screem.height);
  canvas.globalAlpha = 2;
}

/*
 * Function to update particles on canvas
 */
function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  // Recreate particles
  if (timeToRecreate) {
    if (particles.length < initNum) {
      populate(1);
    }
  }
  clear();
  requestAnimationFrame(update.bind(this));
}

update();
