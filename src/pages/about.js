import Head from 'next/head'
import Image from 'next/image'
import Button from '@/components/frontend/Button/Button'
import Header from '@/components/frontend/Header/Header'
import axios from "axios"
import { useAmp } from 'next/amp'
import { useEffect, useRef } from 'react'
export const config = { amp : 'hybrid' }
import { createElement } from 'react'

export async function getServerSideProps() {
  const options = await axios.get('http://localhost:3000/api/get-options')
                 .then(response => response.data)
                 .then((data) => {
                  console.log(data)
                  return data
                 })
  return { 
      props: {
        options
      }
  }
}

export default function About(props) {

  const isAmp = useAmp()
  const options = props.options.data  
  const mainLink = options.find(x => x.key === 'mainLink').value

  useEffect (()=>{
    console.log(`Current mode ${isAmp}`)
  }, [] )

    return (
      <>
        <Head>
          <title>About us</title>
          <meta name="description" content=" " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />

        <Button />
       
      </>
    )
  } 