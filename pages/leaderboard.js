import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image.js'

export default function Leaderboard() {
    return (
        <div>
            <Head>
                <title>Institution Penguin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <CenterContent>
                <div id='boxDisplay'>
                    <div id='boxInside'>
                        <h1>Top 10</h1>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "5rem"}}>
                            <div style={{ display: "flex", flexDirection: "row"}}>
                                <h2>1st</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <h2>Lorem ipsum</h2>
                            </div>
                            <h2>10858pts</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h2>2st</h2>
                            <p>pfp</p>
                            <h2>Lorem ipsum</h2>
                            <h2>10858 points</h2>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h2>3st</h2>
                            <p>pfp</p>
                            <h2>Lorem ipsum</h2>
                            <h2>10858 points</h2>
                        </div>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}