console.log('Main.js at your service:)')

const table_links = document.querySelectorAll(".table_link")

for ( let link of table_links ) {
    link.addEventListener('click', function(e){
        e.preventDefault()

        const blockID = this.getAttribute('data-href').replace('#', '')

        window.scrollTo({
            behavior: 'smooth',
            top: document.getElementById(blockID).getBoundingClientRect().top - document.body.getBoundingClientRect().top - 70,
         })
    })
}

document.querySelector('.scrollTop').addEventListener('click', () => 
    window.scrollTo({ top: 0, behavior: 'smooth' }))

function openCloseMenu(e){
    e.preventDefault()
    document.getElementById('mobileMenu').toggleAttribute('hidden')
    document.querySelector('.overlay').toggleAttribute('hidden')
}

document.querySelector('.burger').addEventListener('click', openCloseMenu)
document.querySelector('.close').addEventListener('click', openCloseMenu)
document.querySelector('.overlay').addEventListener('click', openCloseMenu)

for ( let b of document.querySelectorAll('button')){
    b.addEventListener('click', function() {
        let link = document.getElementById('mainJS').getAttribute('data-link')
        let split = this.getAttribute('data-split')
        location.href=`${link}&split=${split}`
    })
}

const handleScroll = () => {
    if ( window.scrollY > 1000) {
        document.querySelector('.scrollTop').style.opacity = '1';
    } else {
        document.querySelector('.scrollTop').style.opacity = '0';
    }
}

window.addEventListener('scroll', handleScroll);