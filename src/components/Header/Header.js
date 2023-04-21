import Image from "next/image";
import Button from "../Button";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";

const Header = (props) =>  {

        return (
            props.amp ? (
                <header className="header">
                    <div className="headerInner wrapper">
                        <div className="logo">
                            <Image src="/1x-logo.png" alt="Logo 1xBet" width={156} height={40}/>
                        </div>

                        <Menu posts={props.posts} />

                        <div className="buttons">
                            <Button text='KAYIT' buttonStyle="logButton" amp={props.amp} link={props.mainLink} split='buttonLog'/>
                            <Button text='GİRİŞ' buttonStyle="regButton" amp={props.amp} link={props.mainLink} split='buttonReg'/>
                            {/* <button onClick={brandClick} onTap={brandClick} >KAYIT</button>
                        <button onClick={brandClick} onTap={brandClick} className={styles.regButton}>GİRİŞ</button> */}
                        </div>
                    </div>
                </header>
            ) : (
                <header className="header">
                    <div className="overlay"></div>
                    <div className="headerInner wrapper">
                        <div className="logo">
                            <Image src="/1x-logo.png" alt="Logo 1xBet" width={156} height={40}/>
                        </div>

                        <Menu posts={props.posts} />
                        {/*<MobileMenu posts={props.posts} />*/}

                        <div className="buttons">
                            <Button text='KAYIT' buttonStyle="logButton" amp={props.amp} link={props.mainLink} split='buttonLog'/>
                            <Button text='GİRİŞ' buttonStyle="regButton" amp={props.amp} link={props.mainLink} split='buttonReg'/>
                            {/* <button onClick={brandClick} onTap={brandClick} >KAYIT</button>
                        <button onClick={brandClick} onTap={brandClick} className={styles.regButton}>GİRİŞ</button> */}
                        </div>
                    </div>
                </header>
            )
        )    
    }

export default Header;