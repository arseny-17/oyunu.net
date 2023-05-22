import Heading from "@/components/Heading";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Banner/Banner";
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar";
import axios from "axios"
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "../../helpers/render";
import getCSS from "../../helpers/generateCSS";

export const config = { amp: 'hybrid' }

export async function getServerSideProps(context){

   const UA = context.req.headers['user-agent']
   const isMobile = Boolean(UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
   ))

   const isAmp = context.query.amp ? true : false
   const prisma = new PrismaClient()
   const style = getCSS()
   
   const options = await axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/api/get-options`)
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

   const rendered = await renderCustomHTML(post, isAmp, options, isMobile)

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

  const mainLink = props.options_obj.find(x => x.key === 'mainLink').value

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
         <Header amp={isAmp} mainLink={mainLink} menu={props.menu} />
         <div className="content wrapper">
            <div className="contentMain">
               <h1>{ props.post.title }</h1>
               <Banner amp={isAmp} mainLink={mainLink} />
               <div className="content-block" onClick={clickHandler} dangerouslySetInnerHTML={{__html: props.rendered, isAmp }}></div>
            </div>
            <ContentSidebar amp={isAmp} mainLink={mainLink}/>
         </div>
         <Footer amp={isAmp} mainLink={mainLink} />
      </>
   )
}

export default Home;