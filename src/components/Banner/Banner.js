import Button from "../Button"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import ImageWrap from "../ImageWrap"

export default function Banner(){

    const context = useContext({...PageContext})

    const {amp, mainLink, post} = context

    return (

    <div className="banner">
      <div className="banner__wrapper">
        <div className="info">
          <div className="info__text">
            <p className="mainText">Risksiz <span>bahis</span></p>
            <p className="shadow">Ücretler</p>
            <span className="secondText">Her durumda zafer senin</span>
            <div className="button">
                <Button 
                    text="Giriş"
                    amp={amp} 
                    link={mainLink}
                    areaLabel="Giriş"
                    split="buttonBanner"
                    buttonStyle={`btn-banner-${post.page_key} banner-btn`}
                />
            </div>
          </div>
          <div className="list">
            <div className="listItem">
              <span className="number">1</span><span className="name">GİR</span>
            </div>
            <div className="listItem">
              <span className="number">2</span><span className="name">BAHİS YAP</span>
            </div>
            <div className="listItem">
              <span className="number">3</span><span className="name">PARAYI AL</span>
            </div>
          </div>
        </div>
        <div className="bannerImg">
            <ImageWrap imgsrc="/uploads/img/girl.webp" imgwidth={600} imgheight={300} imgalt="banner" />
        </div>
      </div>
    </div>
    )

}