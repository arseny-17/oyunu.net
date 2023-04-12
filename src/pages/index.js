import Heading from "../components/Heading";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "../../helpers/render";

export const config = { amp: 'hybrid' }

export async function getServerSideProps(){

   const prisma = new PrismaClient()
   
   const options = await axios
   .get('http://localhost:3000/api/get-options')
   .then( (response) => {
      return response.data.options_data
   })

   const mainID = parseInt(options.find(x => x.key === 'mainPageID').value) 
   const post = await prisma.post.findUnique({
      where: {
        id: mainID,
      },
  })

   return {
      props: {
         options_obj: options,
         post: post
      }
   }

}



const Home = (props) => {
   
   const isAmp = useAmp()

   const ampStyle = ``

   return (
      <>
         <Heading 
            amp={isAmp}    
            ampStyle={ampStyle}
            seotitle={props.post.seo_title}
            seodescription={props.post.seo_description}
         />
         <Header 
            amp={isAmp} 
            mainLink={props.options_obj.find(x => x.key === 'mainLink').value}/>
         <div className="content wrapper">
         <h1>{ props.post.title }</h1>

         <div className="content-block" 
              dangerouslySetInnerHTML={{__html: renderCustomHTML(props.post, isAmp) }}>
         </div>

         {isAmp ? (
            <span>amp</span>
            ) : (
            <span>noamp</span>
         )}

         
   
         </div>
   <Footer/>
   </>
   )
}

export default Home;