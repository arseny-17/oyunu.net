import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import { useRef } from "react";

const MobileMenu = (props) => {

    const menuRef = useRef()
    const mobileOverlay = useRef()
    const ampPostfix = props.amp ? '?amp=1' : ''

    const openCloseMenu = () => {
        menuRef.current.toggleAttribute('hidden')
        mobileOverlay.current.toggleAttribute('hidden')
    }

  

    const { pathname } = useRouter()

    return (
        <>
            <div className="overlay" 
                id="overlay"
                onClick={openCloseMenu} 
                ref={mobileOverlay} 
                on="tap:mobileMenu.toggleVisibility,overlay.toggleVisibility"
                hidden></div>
          
         
            <div className="burger burgerAmp" 
                on="tap:mobileMenu.toggleVisibility,overlay.toggleVisibility"
                onClick={openCloseMenu}>
                <Image src="/burger.svg" width={28} height={28} alt="Burger icon" />
            </div>               
            
            <div className="mobileMenu" ref={menuRef} id="mobileMenu" hidden>
                
                    <div className="close" 
                    onClick={openCloseMenu}
                    on="tap:mobileMenu.toggleVisibility,overlay.toggleVisibility"
                    >
                        <Image src="/close.svg" width={28} height={28} alt="Close icon" />
                    </div>
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
            </div>
        </>
            
    )
}

export default MobileMenu