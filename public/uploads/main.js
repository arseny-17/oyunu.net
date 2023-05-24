console.log('Main.js at your service:)')

const table_links = document.querySelectorAll(".table_link")

for ( let link of table_links ) {
    link.addEventListener('click', function(e){
        e.preventDefault()

        const blockID = this.getAttribute('href').replace('#', '')

        window.scrollTo({
            behavior: 'smooth',
            top: document.getElementById(blockID).getBoundingClientRect().top - document.body.getBoundingClientRect().top - 70,
         })
    })
}

document.querySelector('.scrollTop').addEventListener('click', () => 
    window.scrollTo({ top: 0, behavior: 'smooth' }))
