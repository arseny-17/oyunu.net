import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

const MobileMenu = (props) => {

    const { pathname } = useRouter()

    return (
        <div className="mobile-menu">
            <div className="burger">
                <Image src="/burger.svg" width={28} height={28} alt="Burger icon" />
            </div>
            <div className="menu_mobile">
                <div className="close">
                    <Image src="/close.svg" width={28} height={28} alt="Close icon" />
                </div>
            </div>
            <div className="menu">
                {props.posts.data && props.posts.data.map(({ id, title, slug }) => (
                    <Link className={pathname === slug ? "active" : null} key={id} href={slug}>
                        {title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MobileMenu