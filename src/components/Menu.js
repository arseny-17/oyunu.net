import Link from "next/link";
import {useRouter} from "next/router";


const Menu = (props) => {

    const { pathname, asPath } = useRouter()

    return (
        <div className="menu">
            { props.list.value && JSON.parse(props.list.value).map(({ id, title, slug }) => (
                <>
                   {
                    ( id === 1 ) 
                    ? <Link href="/" className={pathname == "/" ? "active" : ""}>{title}</Link> 
                    : <Link key={id} className={asPath.includes(slug) ? "active" : ""} href={slug}>{title}</Link> 
                   } 
                </>
                
            ))}
        </div>

    )
}

export default Menu