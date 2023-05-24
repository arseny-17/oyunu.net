import generate from "../../helpers/generateData"
import Container from "@/components/Container"
import Script from 'next/script'

export const config = {
   unstable_runtimeJS: false,
   amp: false
}

export const getStaticPaths = async () => {
   return {
     paths: [
       { params: { slug: [''], amp: false } }
     ],
     fallback: false
   }
 }

export async function getStaticProps({params}){

   const generatedProps = await generate(false)
   
   return {
      props: generatedProps
   }

}

const Home = (props) => {

   const propsClone = {...props}
   propsClone.breadcrumbs = false
   propsClone.link = process.env.NEXT_PUBLIC_HOST

   return (
      <>
         <Container {...propsClone} />
         <Script id="script">
            {`console.log('working...')
            const table_links = document.querySelectorAll(".table_link")
            for ( let link of table_links ) {
                link.addEventListener('click', function(e){
                    e.preventDefault()
                    const blockID = this.getAttribute('href').replace('#', '')
                    window.scrollTo({
                        behavior: 'smooth',
                        top: document.getElementById(blockID).getBoundingClientRect().top 
                        - document.body.getBoundingClientRect().top - 70,
                     })
                })
            }
            document.querySelector('.scrollTop').addEventListener('click', () => 
               window.scrollTo({ top: 0, behavior: 'smooth' }))`}
         </Script>
      </> 
   )
}

export default Home