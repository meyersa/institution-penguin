import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

import io from 'socket.io-client'
let socket

export default function Home() {
  const router = useRouter();
  const [isCompatible, setIsCompatible] = useState(true);
  const { status: status } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1000) {
      setIsCompatible(false);

    }

    if (status !== "authenticated") {
      router.push('/login');

    }

    socketInitializer()

    return () => {
      try {
        socket.disconnect()

      } catch (e) {
        // Probably just disconnected already 

      }
    }
  }, [])

  async function socketInitializer() {
    await fetch('/api/socket')

    socket = io(undefined, {
      path: '/api/socket_io',
    });
  }

  // Not compatible
  if (!isCompatible) {
    return <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div id='boxDisplay'>
        <div id='boxInside' style={{ alignItems: 'center', height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(\'/images/habitat.jpeg\')' }}>
          <h1>Not compatible</h1>
          <a>Unfortunately your browser is not compatible with Institution Penguin, please try again on a different browser or computer.</a>
        </div>
      </div>
      <Footer />
    </div> // Return null if resolution is not greater than 1000px wide
  }

  // Display game
  else {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.0.0-rc/browser/pixi.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.1/socket.io.js" />
        <script src="/lobby/script.js" />
        <div id="keys"></div>
        <Footer />
      </div>
    )
  }
};