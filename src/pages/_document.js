import { Html, Head, Main, NextScript } from 'next/document'
import stylesheet from '../styles/admin.css'

export default function Document() {

  //console.log('amp', props.__NEXT_DATA__.query.amp)

  return (
    <Html lang="en">
     <link rel="stylesheet" href="/admin/admin.css" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
