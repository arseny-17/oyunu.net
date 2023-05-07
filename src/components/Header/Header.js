import Image from "next/image"
import Button from "../Button"
import Menu from "../Menu"
import Link from "next/link"
import MobileMenu from "../MobileMenu/MobileMenu"

const Header = (props) =>  {

        return (
            <header className="header">
                <div className="headerInner wrapper">
                    <div className="logo">
                        <Link href="/">
                            <Image src="/1x-logo.png" alt="Logo 1xBet" width={125} height={32}/>
                        </Link>
                    </div>

                    <Menu list={props.menu} />

                    <div className="buttons">
                        <Button text="KAYIT" buttonStyle="logButton" amp={props.amp} link={props.mainLink} split="buttonLog"/>
                        <Button text="GİRİŞ" buttonStyle="regButton" amp={props.amp} link={props.mainLink} split="buttonReg"/>
                    </div>

                    <MobileMenu list={props.menu} amp={props.amp} />
                </div>
            </header> 
        )    
    }

export default Header;