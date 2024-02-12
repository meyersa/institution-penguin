import Head from 'next/head'
import Header from './components/Header/index.js'
import Wrapper from "./components/Wrapper/index.js"
import Footer from './components/Footer/index.js'
import { useEffect } from 'react'
import io from 'socket.io-client'
let socket

export default function Home() {
  useEffect(() => { socketInitializer() }, [])

  const socketInitializer = async () => {
    socket = io("http://localhost:3001")

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  return (
    <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Wrapper />
      <Footer />
    </div>
  )
};