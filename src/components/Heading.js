import Head from "next/head"
import FaqSchema from "./FaqSchema";
import BreadcrumbsSchema from "./BreadcrumbsSchema";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
//import BreadcrumbsSchema from "./BreadcrumbsSchema";

const Heading = function(props) {


    const content = props.content ? JSON.parse(props.content) : ''
    const faq = ( Array.isArray(content.blocks) ) ? content.blocks.find( (item) => item.type === 'faq') : {}

    return (
        <Head>
            {props.amp 
                ? <style amp-custom="">{props.ampStyle}</style> 
                : <link rel="amphtml" href={`${props.ampLink}/?amp=1`} />
            }
            <title>{props.seotitle}</title>
            <meta name="description" content={props.seodescription}/>
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
            <BreadcrumbsSchema
                title={props.title}
                link={props.link}
                amp={props.amp}
            />
            <link rel="icon" href="/favicon.png" />
        </Head>
    )
        
}
  
export default Heading;