import Heading from "@/components/Heading"
import Button from "@/components/Button"
import { useAmp } from 'next/amp'
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"

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

    const isAmp = useAmp()
    const style = `.logButton {
        background: #7daa2f;
        margin-right: 15px;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 18px;
        line-height: 28px;
        color: #fff;
      }`

    return (
        <>
        <Heading 
           amp={isAmp}    
           ampStyle={style}
           seotitle="Not found"
           seodescription="Not found page"
           content=""
        />
        <div id="scroll"></div>
        
        <div className="content404Page wrapper">
           <div className="content404">
                <Image src="/1x-logo.png" alt="" width="250" height="64" />
              <h1>Page not found</h1>
              <Button text="KAYIT" buttonStyle="logButton" amp={isAmp} link={mainLink} split="button404"/>
           </div>

        </div>
     </>
    )

}
  
export default Error;


