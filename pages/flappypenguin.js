import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import Script from 'next/script'

export default function FlappyPenguin() {
  const router = useRouter();
  const { data: session, status: status } = useSession();

  const [canLoad, setCanLoad] = useState(false);
  const [pixiLoaded, setPixiLoaded] = useState(false);
  const [socketLoaded, setSocketLoaded] = useState(false);

  async function gameInit() {
    const gameScript = document.createElement('script');
    gameScript.src = '/flappypenguin/script.js';
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
  }, [router, status]);

  // Workaround for script loading errors
  useEffect(() => {
    
    // Only load socket when both libraries are ready
    if (pixiLoaded && socketLoaded) {
      gameInit()

    }
  }, [canLoad, pixiLoaded, socketLoaded]);

  // Should only be authenticated left
  if (canLoad) {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.0.0-rc/browser/pixi.min.js" onReady={() => { setPixiLoaded(true) }}/>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.1/socket.io.js" onReady={() => { setSocketLoaded(true) }} />
        <CenterContent>
            <div id='boxDisplay'>
                <div id='boxInside' style={{backgroundImage: 'url(/flappypenguin/images/blur-background.png)', backgroundSize: 'contain'}}>
                    <h1>Welcome to FlappyPenguin!</h1>
                    <a style={{color: 'var(--black)'}}>Are you ready to take on this challenge to avoid as many obstacles as possible?</a>
                    <h2 style={{color: 'var(--dark-grey)'}}>Click start when you are!!</h2>
                </div>
            </div>
        </CenterContent>
        <div id="game"></div>
        <Footer />
      </div>
    )
  } else {
    return (
      <div />
    )
  }
};