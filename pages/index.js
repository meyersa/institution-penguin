import Head from 'next/head'
import Header from './components/Header/index.js'
import Wrapper from "./components/Wrapper/index.js"
import Footer from './components/Footer/index.js'
import { useEffect } from 'react'
import io from 'socket.io-client'
let socket

export default function Home() {
  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function socketInitializer() {
    await fetch('/api/socket')

    // socket = io(undefined, {
    //   path: '/api/socket_io',
    // })

    // socket.on('receive-message', (data) => {
    //   setAllMessages((pre) => [...pre, data])
    // })

    // socket.on('retrieve-users', (data) => {
    //   setAllUsers((pre) => [...pre, data])
    // })
    console.log("Success")
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