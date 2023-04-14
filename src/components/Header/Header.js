import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
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
            <header className="header">
                <div className="headerInner wrapper">
                    <div className="logo">
                        <Image src="/1x-logo.png" alt="Logo 1xBet" width={156} height={40}/>
                    </div>

                    {props.amp ? (
                        <span>amp</span>
                    ) : (
                        <span>noamp</span>
                    )}

                    <div className="menu">
                        {navigation.map(({id, title, path}) => (
                            <Link className={pathname === path ? "active" : null} key={id} href={path}>
                                {title}
                            </Link>
                        ))}                       
                    </div>
                    <div className="buttons">
                        <Button text='KAYIT' buttonStyle="logButton" amp={props.amp} link={props.mainLink} split='buttonLog'/>
                        <Button text='GİRİŞ' buttonStyle="regButton" amp={props.amp} link={props.mainLink} split='buttonReg'/>
                        {/* <button onClick={brandClick} onTap={brandClick} >KAYIT</button>
                        <button onClick={brandClick} onTap={brandClick} className={styles.regButton}>GİRİŞ</button> */}
                    </div>
                </div>
            </header>
        )    
    }


export default Header;