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
                        <h1>Top 3</h1>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <h2 style={{minWidth: "3rem"}}>1st</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>10858pts</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <h2 style={{minWidth: "3rem"}}>2nd</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>8501pts</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <h2 style={{minWidth: "3rem"}}>3rd</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>1500pts</h1>
                        </div>
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Scores</h1>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>115pts</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>15pts</h1>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "4rem"}}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={{width: "100%", height: "100%", maxHeight: "3rem", objectFit: "contain"}}/>
                                <a style={{ minWidth: "10rem"}}>Lorem ipsum</a>
                            </div>
                            <h1 style={{fontSize: "1.3rem", alignSelf: "center"}}>35pts</h1>
                        </div>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}