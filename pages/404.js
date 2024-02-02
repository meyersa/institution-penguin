import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'

export default function Custom404() {
    return (
        <div>
            <Head>
                <title>Institution Penguin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <CenterContent>
                <div id='boxDisplay' style={{width: '100%', backgroundSize: 'cover'}}>
                    <div id='boxInside' style={{alignItems: 'center', height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(\'/images/habitat.jpeg\')'}}>
                        <h1>404 - Page Not Found</h1>
                    </div>
                </div>
            </CenterContent>
        </div>
    )
}