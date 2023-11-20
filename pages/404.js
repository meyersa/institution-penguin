import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

import Image from 'next/image';

export default function Custom404() {
    return (
        <div>
            <Head>
                <title>Institution Penguin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <CenterContent>
                <Image src="/images/habitat.jpeg" alt="404 Habitat not found" width="64" height="64" />
                <h1>404 - Page Not Found</h1>
            </CenterContent>
            <Footer />
        </div>
    )
}