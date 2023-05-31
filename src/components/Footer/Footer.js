import ScrollToTop from "../ScrollToTop"
import Button from "../Button"
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

let year = new Date().getFullYear()

const Footer = () =>  {

    const context = useContext({...PageContext})

    const {amp, mainLink} = context

    return (
        <>
            <footer className="footer">
                <div className="footerInner wrapper">
                    <a href={`https://www.dmca.com/Protection/Status.aspx?ID=f39419ed-e2a4-45e4-88b9-aeba1695fc87&amp;refurl=${process.env.NEXT_PUBLIC_HOST}`} rel="nofollow noopener noreferrer" title="DMCA.com Protection Status" className="dmca-badge" target="_blank"> 
                        <ImageWrap 
                        imgsrc="/uploads/img/dmca.webp" 
                        imgalt="DMCA.com Protection Status"
                        imgwidth="100"
                        imgheight="20"
                        />
                    </a>
                    <span className="copyright">© Copyright {year}</span>
                </div>
                <ScrollToTop amp={amp} />
            </footer>
            <div className="footer-block-btn">
                <div className="buttons">
                    <Button text="KAYIT" areaLabel="KAYIT" buttonStyle="logButton" amp={amp} link={mainLink} split="buttonLog"/>
                    <Button text="GİRİŞ" areaLabel="GİRİŞ" buttonStyle="regButton" amp={amp} link={mainLink} split="buttonReg"/>
                </div>
            </div>
            { amp ? '' : <script defer src="/uploads/main.js"></script>}
        </>
        
    )

}

export default Footer;
