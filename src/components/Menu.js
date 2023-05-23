import Link from "next/link";
import {useRouter} from "next/router";


const Menu = (props) => {

    const { pathname, asPath } = useRouter()
    const ampPostfix = props.amp ? '/amp' : ''

    console.log('pathname', pathname)
    
    return (
        <div className="menu">
            { 
            
            
            props.list.value && JSON.parse(props.list.value).map(({ id, title, slug }) => (
                <>
                    
                   {
                    ( id === 1 ) 
                    ? <Link href={`/${ampPostfix}`} className={ (pathname.includes("[[...slug]]") || pathname == '/amp') ? "active" : ""}>{title}</Link> 
                    : <Link key={id} className={asPath.includes(slug) ? "active" : ""} href={`/${slug}${ampPostfix}`}>{title}</Link> 
                   } 
                </>
                
            ))}
        </div>

    )
}

export default Menu