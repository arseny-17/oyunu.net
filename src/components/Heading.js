import Head from "next/head"
import FaqSchema from "./FaqSchema";

const Heading = function(props) {


    const content = {} || JSON.parse(props.content)
    const faq = ( Array.isArray(content) ) ? content.blocks.find( (item) => item.type === 'faq') : {}

    
    console.log('faq', faq)

    return (
        <Head>
            {props.amp && 
                <>
                    <style amp-custom>{props.ampStyle}</style>
                    
                </>
            }
            <title>{props.seotitle}</title>
            <meta name="description" content={props.seodescription}/>
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
            <link rel="icon" href="/favicon.png" />
        </Head>
    )
        
}
  
export default Heading;