import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import { useRef } from "react";
import Button from "../Button";

const MobileMenu = (props) => {

    const menuRef = useRef()
    const mobileOverlay = useRef()
    const ampPostfix = props.amp ? '?amp=1' : ''

    const ampEvent = {
        on: 'tap:mobileMenu.toggleVisibility,overlay.toggleVisibility',
    }

    const openCloseMenu = () => {
        menuRef.current.toggleAttribute('hidden')
        mobileOverlay.current.toggleAttribute('hidden')
    }

  

    const { pathname } = useRouter()

    return (
        <>
            <Link className="overlay" 
                id="overlay"
                onClick={openCloseMenu} 
                {...(props.amp ? ampEvent : '')}
                ref={mobileOverlay} 
                href=""
                hidden>
            </Link>
          
         
            <Link className="burger burgerAmp" 
                href="#"
                {...(props.amp ? ampEvent : '')}
                onClick={openCloseMenu}>
                <Image src="/burger.svg" width={28} height={28} alt="Burger icon"></Image>
            </Link>               
            
            <div className="mobileMenu" ref={menuRef} id="mobileMenu" hidden>
                
                    <Link className="close" 
                        href="#"
                        onClick={openCloseMenu}
                        {...(props.amp ? ampEvent : '')}
                    >
                        <Image src="/close.svg" width={28} height={28} alt="Close icon"></Image>
                    </Link>
                    <div className="mobileMenuLinks">
                    { props.list.value && JSON.parse(props.list.value).map(({ id, title, slug }) => (
                        <Link 
                            className={pathname === slug ? "active" : null} 
                            key={id} 
                            href={slug + ampPostfix}
                            onClick={openCloseMenu}
                        >
                            {title}
                        </Link>
                    ))}
                    </div>  
                    <div className="buttons">
                        <Button text="KAYIT" areaLabel="KAYIT" buttonStyle="logButton" amp={props.amp} link={props.link} split="buttonLog"/>
                        <Button text="GİRİŞ" areaLabel="GİRİŞ" buttonStyle="regButton" amp={props.amp} link={props.link} split="buttonReg"/>
                    </div>           
            </div>
        </>
            
    )
}

export default MobileMenu