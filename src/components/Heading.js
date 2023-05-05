import Head from "next/head"
import FaqSchema from "./FaqSchema";

const Heading = function(props) {

    console.log('props55', props)

    const content = JSON.parse(props.content)
    const faq = content.blocks.find(obj => {
        return obj.type == 'faq' || {}
    })

    return (
        <Head>
            {props.amp && <style amp-custom>{props.ampStyle}</style>}
            <title>{props.seotitle}</title>
            <meta name="description" content={props.seodescription}/>
            {(Array.isArray(faq.data)) ? <FaqSchema faq={faq.data} /> : '' }
        </Head>
    )
        
}
  
export default Heading;