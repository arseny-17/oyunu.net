import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
  
    <Html lang="tr">
      <Head />
      <body>
        <Main />
        <NextScript />
        { process.env.NEXT_PUBLIC_MODE == 'production' ? <script defer src="/uploads/main.js"></script> : ''}
      </body>
    </Html>
  )
}
