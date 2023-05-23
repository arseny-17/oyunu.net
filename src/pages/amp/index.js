import Heading from "@/components/Heading"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Banner from "@/components/Banner/Banner"
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar"
import generate from "../../../helpers/generateData"
import Page from "../[[...slug]]"
export const config = { amp: true }
export default Page

export async function getServerSideProps(){

    const generatedProps = await generate(true)
   
    return {
        props: generatedProps
    }

}