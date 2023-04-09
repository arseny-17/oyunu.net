import Head from "next/head"

const Heading = (props) => (

    <Head>
        {props.amp && <style amp-custom>{props.ampStyle}</style>}
        <title>{props.seotitle}</title>
        <meta name="description" content={props.seodescription}/>
    </Head>
)
  
export default Heading;