import Link from "next/link"
import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"

const Breadcrumbs = () => {

    const context = useContext({...PageContext})
    const {amp, title, sitename} = context
    const ampPostfix = amp ? 'amp' : ''

    return (
        <nav className="breadcrumbs">
            <Link href={"/" + ampPostfix}>{sitename}</Link>
            <span className="sep"></span>
            <span className="last">{title}</span>
        </nav>

    )
}

export default Breadcrumbs