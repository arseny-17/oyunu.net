import Link from "next/link";
import styles from "./Footer.module.scss"
import {useEffect, useRef} from 'react'

let year = new Date().getFullYear()

const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
}

const Footer = () =>  {

    const buttonRef = useRef()

    useEffect( () => {
        const handleClick = () => {
            if ( window.scrollY > 1000) {
				buttonRef.current.style.opacity = '1';
			} else {
				buttonRef.current.style.opacity = '0';
			}
        }
    
        window.addEventListener('scroll', handleClick);
    
        return () => {
          window.removeEventListener('scroll', handleClick);
        }

      }, [])

    return (<footer className={styles.footer}>
        <div className={`${styles.footerInner} wrapper`}>

            <span className={styles.copyright}>© Copyright {year}</span>
        </div>
        <div className={styles.scrollTop} onClick={scrollTop} ref={buttonRef}>
            <img src="/up-arrow.svg" width="13px" height="13px" alt="scroll to top" />
        </div>
    </footer>
    )


}

export default Footer;
