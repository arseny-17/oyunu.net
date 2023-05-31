import Button from "../Button"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

export default function Banner(){

    const context = useContext({...PageContext})

    const {amp, mainLink} = context

    return (
        <div 
            className="banner"
            style={{
                background: `url(/uploads/img/webp/banner-1x.jpg.webp)no-repeat`, 
                backgroundPosition: `center`,
                backgroundSize: `cover`
            }}>
            <Button 
                text="Bonus almak"
                amp={amp} 
                link={mainLink}
                areaLabel="Bonus almak"
                split="buttonBanner"
                buttonStyle="banner-btn"/>
        </div>
      
    )

}