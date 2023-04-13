import Image from "next/image"
import Menu from "@/components/frontend/Menu/Menu"
import { useEffect, useState } from "react"
import style from '@/components/frontend/Header/Header.module.scss'




export default function Header(props) {

    let menu = [
        {title: "main", id: 12},
        {title: "about", id: 7}
    ]

    let [count, setCount] = useState(12)

    function updateCount() {
        setCount(count + 1)
    }

    useEffect (()=>{console.log(`Count is updates with value ${count}`)})

    useEffect (()=>{
        console.log('Page loaded')
        document.querySelector(`.${style.counter}`).classList.add('new')
    }, [] )   

    return (
        <>
        { console.log(style) }

        <header className={style.header}>
            <Image src="/uploads/img/logo.png" alt="logo" className="logo" width="80" height="40" />
            <Menu list={menu} />   
            
            <span className={style.counter}>{count}</span>
            <button className={style.button} onClick={updateCount}> +1 </button>
        </header>
        </>
    )

}