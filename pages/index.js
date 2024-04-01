import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

import io from 'socket.io-client'
let socket

export default function Home() {
  const router = useRouter();
  const [isCompatible, setIsCompatible] = useState(false);
  const { data: session, status: status } = useSession();

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setIsCompatible(false);

    } else {
      setIsCompatible(true);

    }
  }, [])

  useEffect(() => {
    
    // Not authenticated and is compatible
    if (status !== "authenticated" && isCompatible) {
      router.push('/login');
      return () => {}

    }
  }, [isCompatible, router, status])

  useEffect(() => {
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

  /*
   * Not compatible
   * Display box saying that
   */
  if (!isCompatible) {
    return <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div id='boxDisplay'>
        <div id='boxInside'>
          <h1 style={{backgroundColor: "var(--red)"}}>Not compatible</h1>
          <a>Unfortunately your browser is not compatible with Institution Penguin, please try again on a different browser or computer.</a>
        </div>
        <div id='boxInside'>
          <h1>Checkout profiles and leaderboards</h1>
          <a>You can still view profiles and leaderboards while on mobile. Click a button below to go there</a>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link href="/leaderboard" style={{ padding: "1rem", background: "var(--light-white)", color: "var(--grey)", borderRadius: "0.5rem" }}>Leaderboard</Link>
          </div>
        </div>
        <div id='boxInside'>
          <h1>Learn more</h1>
          <a>You can also learn more about our project at the following links</a>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link href="https://github.com/meyersa/institution-penguin">
              <Image src="/images/github.png" width="50" height="50" alt="Github logo" style={{ filter: "invert(100)" }} />
            </Link>
            <Link href="/about" style={{ padding: "1rem", background: "var(--light-white)", color: "var(--grey)", borderRadius: "0.5rem" }}>About</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }

  /*
   * Not authenticated, but compatible
   * Show limited HTML for cleaner redirect after push
   */
  else if (status !== "authenticated") {
    return <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  }

  /*
   * Authenticated and compatible
   * Load game
   */
  else {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.0.0-rc/browser/pixi.min.js" async />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.1/socket.io.js" async />
        <script src="/lobby/script.js" async />
        <div id="keys"></div>
        <Footer />
      </div>
    )
  }
};