import Heading from "@/components/Heading"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Banner from "@/components/Banner/Banner"
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar"
import generate from "../../helpers/generateData"


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

   const isAmp = props.amp

   function clickHandler(e) {

      if (!isAmp){
         const el = e.target.closest(".table_link")

         if (el && e.currentTarget.contains(el)) {

            e.preventDefault()

            const blockID = el.getAttribute('href').replace('#', '')
            window.scrollTo({
            behavior: 'smooth',
            top: document.getElementById(blockID).getBoundingClientRect().top -
               document.body.getBoundingClientRect().top - 70,
         })
      }
   }

  }

   return (
      <>
        
        <Heading 
            ampLink={process.env.NEXT_PUBLIC_HOST}
            amp={isAmp}    
            ampStyle={props.ampStyle}
            seotitle={props.post.seo_title}
            seodescription={props.post.seo_description}
            content={props.post.content}
            breadcrumbs={false}
         />
         <div id="scroll"></div>
         <Header amp={isAmp} mainLink={props.mainLink} menu={props.menu} />
         <div className="content wrapper">
            <div className="contentMain">
               <h1>{ props.post.title }</h1>
               <Banner amp={isAmp} mainLink={props.mainLink} />
               <div className="content-block" onClick={clickHandler} dangerouslySetInnerHTML={{__html: props.rendered, isAmp }}></div>
            </div>
            <ContentSidebar amp={isAmp} mainLink={props.mainLink}/>
         </div>
         <Footer amp={isAmp} mainLink={props.mainLink} />
         
      </>
   )
   
}

export default Home;