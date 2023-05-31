import Head from "next/head"
import FaqSchema from "./FaqSchema";
import BreadcrumbsSchema from "./BreadcrumbsSchema"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Heading = function() {

    const context = useContext({...PageContext})
    const {ampLink, amp, ampStyle, seotitle, seodescription, content, title, link, breadcrumbs} = context
    const post_content = content ? JSON.parse(content) : ''
    const faq = ( Array.isArray(post_content.blocks) ) ? post_content.blocks.find( (item) => item.type === 'faq') : {}

    return (
        <Head>
            {amp 
                ? <style amp-custom="">{ampStyle}</style> 
                : <link rel="amphtml" href={`${ampLink}/amp`} />
            }
            <title>{seotitle}</title>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="description" content={seodescription}/>
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
            {breadcrumbs ? <BreadcrumbsSchema title={title} link={link} amp={amp}/>: ""}
            <link rel="icon" href="/favicon.png" />
        </Head>
    )
        
}
  
export default Heading;