import Link from "next/link";

const Breadcrumbs = (props) => {

    const ampPostfix = props.amp ? '?amp=1' : ''

    return (
        <nav className="breadcrumbs">
            <Link href={"/" + ampPostfix}>{props.sitename}</Link>
            <span className="sep"></span>
            <span className="last">{props.title}</span>
        </nav>

    )
}

export default Breadcrumbs