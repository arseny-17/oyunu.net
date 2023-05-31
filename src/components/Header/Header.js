import Image from "next/image"
import Button from "../Button"
import Menu from "../Menu"
import Link from "next/link"
import MobileMenu from "../MobileMenu/MobileMenu"
import ImageWrap from "../ImageWrap"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Header = () =>  {

    const context = useContext({...PageContext})

    const {amp, mainLink,mainID, menu} = context

    const ampPostfix = amp ? '/amp' : ''

        return (

            <header className="header">
                <div className="headerInner wrapper">
                    <div className="logo">
                        <Link href={"/" + ampPostfix}>
                            <ImageWrap imgsrc="/1x-logo.png" imgalt="Logo 1xBet" imgwidth={125} imgheight={32}></ImageWrap>
                        </Link>
                    </div>

                    <Menu list={menu} amp={amp} mainID={mainID} />

                    <div className="buttons">
                        <Button text="KAYIT" areaLabel="KAYIT" buttonStyle="logButton" amp={amp} link={mainLink} split="buttonLog"/>
                        <Button text="GİRİŞ" areaLabel="GİRİŞ" buttonStyle="regButton" amp={amp} link={mainLink} split="buttonReg"/>
                    </div>

                    <MobileMenu list={menu} amp={amp} link={mainLink} />
                </div>
            </header> 
        )    
    }

export default Header;