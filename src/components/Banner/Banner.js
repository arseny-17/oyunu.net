import Button from "../Button"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import ImageWrap from "../ImageWrap"

export default function Banner(){

    const context = useContext({...PageContext})

    const {amp, mainLink} = context

    return (
        <>

           
  
        <div className="banner">
            <div className="info">
                <p className="mainText">Risksiz <span>bahis</span></p>
                <p className="shadow">Ücretler</p>
                <span className="secondText">Her durumda zaferin</span>
                <div className="button">
                    <Button 
                        text="Bahse gir"
                        amp={amp} 
                        link={mainLink}
                        areaLabel="Bahse gir"
                        split="buttonBanner"
                        buttonStyle="btn-banner- banner-btn"
                    />
                </div>
                <div className="list">
                    <div className="listItem">
                        <span className="number">1</span>
                        <span className="name">Gir</span>
                    </div>
                    <div className="listItem">
                        <span className="number">2</span>
                        <span className="name">Bahse gir</span>
                    </div>
                    <div className="listItem">
                        <span className="number">3</span>
                        <span className="name">Parayı al</span>
                    </div>
                </div>
            </div>
            <div className="bannerImg">
                <ImageWrap imgsrc="/uploads/img/girl.webp" imgwidth={600} imgheight={300} alt="" />
            </div>
        </div>
        </>
    )

}