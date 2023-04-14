import '@/styles/globals.scss'
import '@/styles/admin.css'
import Layout from '@/components/Layout'
import footerStyles from '@/components/Footer/Footer.scss'
import headerStyles from '@/components/Header/Header.scss'




export default function MyApp ({Component, pageProps}) {

  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
  )
}

