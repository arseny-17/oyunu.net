import Heading from "../../components/Heading";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'

export const config = { amp: 'hybrid' }

export async function getServerSideProps(){

   const prisma = new PrismaClient()

   const options = await axios
   .get('http://localhost:3000/api/get-options')
   .then( (response) => {
      
      return response.data.options_data
   })

   const main_page_id = options.find(x => x.key === 'mainPageID').value

   const main = await prisma.post.findFirst({
      where: {
        id: parseInt(main_page_id)
      }
   })

   return {
      props: {
         options_obj: options,
         post_obj: main
      }
   }

}

const CategoryMain = (props) => {

   console.log('html', props.post_obj)
   
   const isAmp = useAmp()

   const ampStyle = ``

   return (
      <>
         <Heading 
            amp={isAmp} 
            ampStyle={ampStyle}
            seotitle={props.post_obj.seo_title}
            seodescription={props.post_obj.seo_description}
         />
         <Header amp={isAmp} mainLink={props.options_obj.find(x => x.key === 'mainLink').value}/>
         <div className="content wrapper">
            <h1>Dynamic route</h1>
            
         </div>
   <Footer/>
   </>
   )
}

export default CategoryMain;