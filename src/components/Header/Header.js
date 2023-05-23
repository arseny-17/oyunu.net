import Image from "next/image"
import Button from "../Button"
import Menu from "../Menu"
import Link from "next/link"
import MobileMenu from "../MobileMenu/MobileMenu"
import ImageWrap from "../ImageWrap"

const Header = (props) =>  {

    const ampPostfix = props.amp ? '/amp' : ''

        return (
            <header className="header">
                <div className="headerInner wrapper">
                    <div className="logo">
                        <Link href={"/" + ampPostfix}>
                            <ImageWrap imgsrc="/1x-logo.png" imgalt="Logo 1xBet" imgwidth={125} imgheight={32}></ImageWrap>
                        </Link>
                    </div>

                    <Menu list={props.menu} amp={props.amp} />

                    <div className="buttons">
                        <Button text="KAYIT" areaLabel="KAYIT" buttonStyle="logButton" amp={props.amp} link={props.mainLink} split="buttonLog"/>
                        <Button text="GİRİŞ" areaLabel="GİRİŞ" buttonStyle="regButton" amp={props.amp} link={props.mainLink} split="buttonReg"/>
                    </div>

                    <MobileMenu list={props.menu} amp={props.amp} link={props.mainLink} />
                </div>
            </header> 
        )    
    }

export default Header;