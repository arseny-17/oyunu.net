import ScrollToTop from "../ScrollToTop";
import Button from "../Button";

let year = new Date().getFullYear()

const Footer = (props) =>  {

    return (
        <>
            <footer className="footer">
                <div className="footerInner wrapper">
                    <a href={`https://www.dmca.com/Protection/Status.aspx?ID=f39419ed-e2a4-45e4-88b9-aeba1695fc87&amp;refurl=${process.env.NEXT_PUBLIC_HOST}`} rel="nofollow noopener noreferrer" title="DMCA.com Protection Status" className="dmca-badge" target="_blank"> 
                        <img src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-11.png?ID=f39419ed-e2a4-45e4-88b9-aeba1695fc87" 
                        alt="DMCA.com Protection Status"
                        height="100"
                        width="20"
                        />
                    </a>
                    <span className="copyright">© Copyright {year}</span>
                </div>
                <ScrollToTop amp={props.amp} />
            </footer>
            <div className="footer-block-btn">
                <div className="buttons">
                    <Button text="KAYIT" areaLabel="KAYIT" buttonStyle="logButton" amp={props.amp} link={props.mainLink} split="buttonLog"/>
                    <Button text="GİRİŞ" areaLabel="GİRİŞ" buttonStyle="regButton" amp={props.amp} link={props.mainLink} split="buttonReg"/>
                </div>

            </div>
        </>
        
    )

}

export default Footer;
