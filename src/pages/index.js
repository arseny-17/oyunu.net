import Heading from "../components/Heading";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContentSidebar from "../components/ContentSidebar/ContentSidebar";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "../../helpers/render";
import getCSS from "../../helpers/generateCSS";

export const config = { amp: 'hybrid' }

export async function getServerSideProps(context){

   const isAmp = context.query.amp ? true : false
   const prisma = new PrismaClient()
   const style = getCSS()
   
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

   const category = await prisma.lang.findUnique({
      where: {
        id: post.language_id,
      },
   })

   const menu = await prisma.menu.findUnique({
      where: {
        id: category.menu_id,
      },
   })

   const rendered = await renderCustomHTML(post, isAmp)

   return {
      props: {
         options_obj: options,
         post: post,
         menu: menu,
         rendered: rendered,
         ampStyle: style
      }
   }

}

const Home = (props) => {
   
   const isAmp = useAmp()

   return (
      <>
         <Heading 
            amp={isAmp}    
            ampStyle={props.ampStyle}
            seotitle={props.post.seo_title}
            seodescription={props.post.seo_description}
            content={props.post.content}
         />
         <div id="scroll"></div>
         <Header
            amp={isAmp}
            mainLink={props.options_obj.find(x => x.key === 'mainLink').value}
            menu={props.menu}
         />
         <div className="content wrapper">
            <div className="contentMain">
               <h1>{ props.post.title }</h1>
               <div className="content-block"
                     dangerouslySetInnerHTML={{__html: props.rendered, isAmp }}>
               </div>
            </div>

            <ContentSidebar 
               amp={isAmp} 
               mainLink={props.options_obj.find(x => x.key === 'mainLink').value}
            />

         </div>
         <Footer amp={isAmp} />
      </>
   )
}

export default Home;