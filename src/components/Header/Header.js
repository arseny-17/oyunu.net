import Image from "next/image";
import Button from "../Button";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";

const Header = (props) =>  {

        return (
            <header className="header">
                { props.amp ? <div className="overlay"></div> : '' }
                <div className="headerInner wrapper">
                    <div className="logo">
                        <Image src="/1x-logo.png" alt="Logo 1xBet" width={156} height={40}/>
                    </div>

                    <Menu list={props.menu} />

                    <div className="buttons">
                        <Button text="KAYIT" buttonStyle="logButton" amp={props.amp} link={props.mainLink} split="buttonLog"/>
                        <Button text="GİRİŞ" buttonStyle="regButton" amp={props.amp} link={props.mainLink} split="buttonReg"/>
                    </div>
                </div>
            </header> 
        )    
    }

export default Header;