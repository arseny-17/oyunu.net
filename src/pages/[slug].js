import Heading from "../components/Heading";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'


export const config = { amp: 'hybrid' }

export async function getServerSideProps({req, res, params}){

   const prisma = new PrismaClient()

   const options = await axios
   .get('http://localhost:3000/api/get-options')
   .then( (response) => {
      return response.data.options_data
   })
   
   console.log('post', params.slug)

   const post = await prisma.post.findFirst({
      where: {
        slug: params.slug,
      },
  })


   return {
      props: {
         options_obj: options,
         post_obj: post
      }
   }

  

}

const Page = (props) => {
   
   const isAmp = useAmp()

   const ampStyle = ''


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
            <h1>{props.post_obj.title}</h1>
            <div>
               {console.log(props.post_obj.content)}
            </div>
        </div>
        <Footer/>
   </>
   )
}

export default Page