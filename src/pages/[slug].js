import Heading from "@/components/Heading";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "../../helpers/render";
import getCSS from "../../helpers/generateCSS";


export const config = { amp: 'hybrid' }

export async function getServerSideProps(context){

   const prisma = new PrismaClient()
   const isAmp = context.query.amp ? true : false
   const style = getCSS()

   const options = await axios
   .get('http://localhost:3000/api/get-options')
   .then( (response) => {
      return response.data.options_data
   })


   const post = await prisma.post.findFirst({
      where: {
        slug: context.query.slug,
      },
  })

  if (!post) {
      return {
      notFound: true
      };
   }

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
         post_obj: post,
         menu: menu,
         rendered: rendered,
         ampStyle: style
      }
   }

  

}

const Page = (props) => {
   
   const isAmp = useAmp()

   const ampStyle = ''

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
            amp={isAmp} 
            ampStyle={props.ampStyle}
            seotitle={props.post_obj.seo_title}
            seodescription={props.post_obj.seo_description}
            content={props.post_obj.content}
         />
         
         <Header 
            amp={isAmp} 
            mainLink={props.options_obj.find(x => x.key === 'mainLink').value}
            menu={props.menu}
         />
         
         <div className="content wrapper">
      
            <div className="contentMain">
               <h1>{props.post_obj.title}</h1>
               <div className="content-block"
                  onClick={clickHandler}
                  dangerouslySetInnerHTML={{__html: props.rendered, isAmp }}>
               </div>
            </div>

            <ContentSidebar 
               amp={isAmp} 
               mainLink={props.options_obj.find(x => x.key === 'mainLink').value}
            />
            
        </div>
        <Footer/>
   </>
   )
}

export default Page