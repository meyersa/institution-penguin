import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import Script from 'next/script'

import io from 'socket.io-client'
let socket

export default function Home() {
  const router = useRouter();
  const { data: session, status: status } = useSession();

  const [canLoad, setCanLoad] = useState(false);
  const [pixiLoaded, setPixiLoaded] = useState(false);
  const [socketLoaded, setSocketLoaded] = useState(false);

  async function socketInitializer() {
    await fetch('/api/socket').then(() => {
      socket = io(undefined, {
        path: '/api/socket_io',
      });
    }).catch(e => {
      console.error("Could not create socket")

    })

    const gameScript = document.createElement('script');
    gameScript.src = '/lobby/script.js';
    gameScript.onload = () => {
      startScript()

    }
    document.body.appendChild(gameScript);
    
  }

  // Conditions to be viewing page
  useEffect(() => {

    // Set initial compatibility for window size
    if (window.innerWidth <= 1000) {
      router.push('/incompatible');
      return () => { }

    }

    // Not authenticated and is compatible
    if (status !== "authenticated" && status !== "loading") {
      router.push('/login');
      return () => { }

    }

    // Conditions are met
    if (status == "authenticated") {
      setCanLoad(true)

    }
  }, [status]);

  // Workaround for script loading errors
  useEffect(() => {

    // Only load socket when both libraries are ready
    if (pixiLoaded && socketLoaded) {
      socketInitializer()

    }
  }, [pixiLoaded, socketLoaded]);

  // Should only be authenticated left
  if (canLoad) {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.0.0-rc/browser/pixi.min.js" onLoad={() => { setPixiLoaded(true) }}/>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.1/socket.io.js" onLoad={() => { setSocketLoaded(true) }} />
        <div id="game"></div>
        <Footer />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
};