// Srollbar & Navbar scroll
let progressScrollbar = document.querySelector('.progress-scrollbar')
let totalHeight = document.body.scrollHeight - window.innerHeight

const section = document.querySelectorAll('section')
const navLink = document.querySelectorAll('.navbar .navbar__item .navbar__link a')

window.onscroll = function() {

    let progressHeight = (window.pageYOffset / totalHeight) * 100
    progressScrollbar.style.height = progressHeight + '%'

    section.forEach(sec => {

        const top = window.scrollY
        const offset = sec.offsetTop - 150
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')

        if(top >= offset && top < offset + height) {

            navLink.forEach(link => {
                link.classList.remove('active')
                document.querySelector('.navbar .navbar__item .navbar__link a[href*=' + id +']').classList.add('active')
            })
        }

    })

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


// Scroll Reveal Animation
const scrollReveal = ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 100,
    // reset: true
})



scrollReveal.reveal(`.header__logo`, {origin: 'top'})
scrollReveal.reveal(`.navbar__item`, {origin: 'top', interval: 100})

scrollReveal.reveal(`.home__left, .home__title, .title, .home__text`, {origin: 'bottom', delay: 800, interval: 100})
scrollReveal.reveal(`.home__btns, a`, {origin: 'left', delay: 1000})
scrollReveal.reveal(`.home__right`, {origin: 'right', delay: 1000})
