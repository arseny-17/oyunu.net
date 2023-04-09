import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss"
import Button from "../Button";

const navigation =  [
    {id:1, title:'1xBet', path:'/'},
    {id:2, title:'Bonuslar', path:'/bonus'},
    {id:3, title:'Mobil uygulama', path:'/mobil'},
];


const Header = (props) =>  {

        const { pathname } = useRouter()

        console.log('header', props)

        return (
            <header className={styles.header}>
                <div className={`${styles.headerInner} wrapper`}>
                    <div className="logo">
                        <Image src="/1x-logo.png" alt="Logo 1xBet" width={156} height={40}/>
                    </div>

                    {props.amp ? (
                        <span>amp</span>
                    ) : (
                        <span>noamp</span>
                    )}

                    <div className={styles.menu}>
                        {navigation.map(({id, title, path}) => (
                            <Link className={pathname === path ? styles.active : null} key={id} href={path}>
                                {title}
                            </Link>
                        ))}                       
                    </div>
                    <div className={styles.buttons}>
                        <Button text='KAYIT' buttonStyle={styles.logButton} amp={props.amp} link={props.mainLink} split='buttonLog'/>
                        <Button text='GİRİŞ' buttonStyle={styles.regButton} amp={props.amp} link={props.mainLink} split='buttonReg'/>
                        {/* <button onClick={brandClick} onTap={brandClick} >KAYIT</button>
                        <button onClick={brandClick} onTap={brandClick} className={styles.regButton}>GİRİŞ</button> */}
                    </div>
                </div>
            </header>
        )    
    }


export default Header;