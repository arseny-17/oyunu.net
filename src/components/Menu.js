import Link from "next/link";
import {useRouter} from "next/router";

const Menu = (props) => {

    const { pathname } = useRouter()

    return (
        <div className="menu">
            {props.posts.data && props.posts.data.map(({ id, title, slug }) => (
                <Link className={pathname === slug ? "active" : null} key={id} href={slug}>
                    {title}
                </Link>
            ))}
        </div>
    )
}

export default Menu