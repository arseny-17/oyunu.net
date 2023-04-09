import { useEffect } from "react";
import { useRouter } from "next/router";

const Error = () => {

    const router = useRouter ();

    useEffect (() => {
        setTimeout ( () => {
            router.push('/')
            }, 3000)
    }, [router]);

    return (
        <div className="content wrapper pageError">
            <h1>404 Page not found</h1>
        </div>
    )

}
  
export default Error;