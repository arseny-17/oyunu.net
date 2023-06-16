import Head from "next/head"
import FaqSchema from "./FaqSchema";
import BreadcrumbsSchema from "./BreadcrumbsSchema"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Heading = function() {

    const context = useContext({...PageContext})
    const {post, amp, ampStyle, sitename, link, breadcrumbs} = context
    const post_content = post ? JSON.parse(post.content) : ''
    const faq = ( Array.isArray(post_content.blocks) ) ? post_content.blocks.find( (item) => item.type === 'faq') : {}

    return (
        <Head>
            {amp 
                ? <style amp-custom="">{ampStyle}</style> 
                : <link rel="amphtml" href={`${link}/amp/`} />
            }
            <title>{post.seo_title}</title>
            <meta name="robots" content="index,follow" />
            <meta name="description" content={post.seo_description}/>
            <meta property="og:locale" content="tr_TR" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={post.seo_title} />
            <meta property="og:description" content={post.seo_description} />
            <meta property="og:site_name" content={sitename} />
            <meta property="og:updated_time" content="2023-05-25T15:43:15+00:00" />
            <meta property="article:published_time" content="2022-11-15T13:45:33+00:00" />
            <meta property="article:modified_time" content="2023-05-25T15:43:15+00:00" />
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
            {breadcrumbs ? <BreadcrumbsSchema title={post.title} link={link} amp={amp}/>: ""}
            <link rel="icon" href="/favicon.png" />
            <link rel="canonical" href={`${link}/`} />
        </Head>
    )
        
}
  
export default Heading;