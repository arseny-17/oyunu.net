import Head from "next/head"
import FaqSchema from "./FaqSchema";
import BreadcrumbsSchema from "./BreadcrumbsSchema";

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
            <meta name="robots" content="noindex,nofollow" />
            <meta name="description" content={props.seodescription}/>
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
            {props.breadcrumbs ? <BreadcrumbsSchema title={props.title} link={props.link} amp={props.amp}/>: ""}
            <link rel="icon" href="/favicon.png" />
        </Head>
    )
        
}
  
export default Heading;