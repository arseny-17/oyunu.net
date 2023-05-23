import Heading from "@/components/Heading";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar";
import { useAmp } from 'next/amp'
import { PrismaClient } from '@prisma/client'
import renderCustomHTML from "../../../helpers/render";
import getCSS from "../../../helpers/generateCSS";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Page from "../[slug]"
export const config = { amp: true }

export default Page

export async function getServerSideProps(context){
 
    const prisma = new PrismaClient()
    const isAmp = context.query.amp ? true : false
    const style = getCSS()
 
    const options = await prisma.options.findMany()
    const mainLink = options.find(x => x.key == 'mainLink').value
    const sitename = options.find(x => x.key == 'sitename').value
 
    const post = await prisma.post.findFirst({
       where: {
         slug: context.query.slug,
       }
    })

 
   if (!post) {
       return { notFound: true }
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
    
    const rendered = await renderCustomHTML(post, isAmp, options)
 
    return {
       props: {
          mainLink: mainLink,
          post_obj: post,
          menu: menu,
          rendered: rendered,
          ampStyle: style,
          sitename: sitename,
          slug: post.slug
       }
    }
 
   
 
 }
