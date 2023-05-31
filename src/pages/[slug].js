import generate from "../../helpers/generateData"
import Container from "@/components/Container"
import { useAmp } from "next/amp"

export const config = { unstable_runtimeJS: false }

export async function getStaticProps({params}){

   const generatedProps = await generate(false, params.slug)

   if (!generatedProps.post) {
      return { notFound: true }
   }

   return {
      props: generatedProps
   }

}

export async function getStaticPaths() {
   return {
      paths: [
         {
           params: {
             slug: '1xbet-canli-mac-izle',
           },
         },
         {
            params: {
              slug: '1xbet-bonuslar-ve-promosyon-kodlari',
            },
          },
          {
            params: {
              slug: '1xbet-mobil-uygulama-indir',
            },
          },
          {
            params: {
              slug: '1xbet-yorumlar-oku',
            },
          },
       ],
     fallback: false,
   }
 }

const Page = (props) => {
   
   const propsClone = {...props}
   propsClone.breadcrumbs = true
   propsClone.amp = useAmp()
   propsClone.link = `${process.env.NEXT_PUBLIC_HOST}/${props.post.slug}`

   return (
      <Container {...propsClone} />
   )
}

export default Page