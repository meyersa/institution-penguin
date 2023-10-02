import Head from 'next/head'
import Header from './components/Header/index.js'
import Wrapper from "./components/Wrapper/index.js"
import Footer from './components/Footer/index.js'

export default function Home() {
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