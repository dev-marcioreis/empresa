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
    height: '110%', 
    ease: Expo.easeOut
}, 'start')
.to('.image__box', {
    ease: Expo.ease
}, 'start')

gsap.timeline({
    scrollTrigger: {
        trigger: '.wrappe',
        scrub: 7
    }
})
.to('.wrapper__slider', 1, {
    x: innerWidth * -1
})


// Scroll Reveal Animation
const scrollReveal = ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 100,
    // reset: true
})


scrollReveal.reveal(`.home__left, .home__title, .home__text`, {origin: 'left', delay: 100, interval: 200})
scrollReveal.reveal(`.home__right`, {origin: 'right', delay: 200})
