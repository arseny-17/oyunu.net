import '@/styles/globals.scss'
import '@/styles/admin.css'
import Layout from '../components/Layout'




export default function MyApp ({Component, pageProps}) {

  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
  )
}

