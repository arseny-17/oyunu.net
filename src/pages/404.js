import Button from "@/components/Button"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Head from "next/head"

const Error = function() {

    const [mainLink, setMainLink] = useState('')

    async function getOption(){
      await axios
         .get(`${process.env.NEXT_PUBLIC_HOST}/api/get-options`)
         .then( (response) => {
            let link = response.data.options_data.find(x => x.key === 'mainLink').value
            setMainLink(link)
            return link
      })
    }
    
   useEffect(getOption, [])

    return (
        <>
        <Head>
            <title>Not found</title>
        </Head>
        <div id="scroll"></div>
        
        <div className="content404Page wrapper">
           <div className="content404">
                <Image src="/1x-logo.png" alt="" width="250" height="64" />
              <h1>Page not found</h1>
              <Button text="KAYIT" buttonStyle="logButton" amp={false} link={mainLink} split="button404"/>
           </div>

        </div>
     </>
    )

}
  
export default Error;


