import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

export default function Incompatible() {
    return (
        <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div id='boxDisplay'>
        <div id='boxInside' style={{alignItems: 'center', height: '40vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(\'/images/habitat.jpeg\')'}}>
          <h1 style={{ backgroundColor: "var(--red)" }}>Not compatible</h1>
          <a style={{ backgroundColor: "var(--red)", padding: '1rem'}}>Unfortunately your browser is not compatible with Institution Penguin, please try again on a different browser or computer.</a>
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
    )
}