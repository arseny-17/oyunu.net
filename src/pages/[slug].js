import generate from "../../helpers/generateData"
import Container from "@/components/Container"
import { useAmp } from "next/amp"

export const config = { amp: 'hybrid' }

export async function getServerSideProps(context){

   let isAmp = context.query.amp ? true : false

   const generatedProps = await generate(isAmp, context.query.slug)

   if (!generatedProps.post) {
      return { notFound: true }
   }

   return {
      props: generatedProps
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