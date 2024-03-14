import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image.js'
import Link from 'next/link.js'

const pageCSS = {
    leaderboardOutside: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: "4rem"
    },
    leaderboardInside: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    leaderboardPlace: {
        minWidth: "3rem"
    },
    leaderboardImage: {
        width: "100%",
        height: "100%",
        maxHeight: "3rem",
        objectFit: "contain"
    },
    leaderboardLink: {
        minWidth: "10rem",
        textDecoration: "underline",
        textDecorationColor: "rgb(10, 186, 250)",
        textDecorationThickness: "0.2rem"
    },
    leaderboardPoints: {
        fontSize: "1.3rem",
        alignSelf: "center"
    }
}

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
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <h2 style={pageCSS.leaderboardPlace}>1st</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>10858pts</h1>
                        </div>
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <h2 style={pageCSS.leaderboardPlace}>2nd</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>9081pts</h1>
                        </div>
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <h2 style={pageCSS.leaderboardPlace}>3rd</h2>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>1500pts</h1>
                        </div>
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Scores</h1>
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>108pts</h1>
                        </div>
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>858pts</h1>
                        </div>
                        <div style={pageCSS.leaderboardOutside}>
                            <div style={pageCSS.leaderboardInside}>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                <Link href="/profile/lorem-ipsum" style={pageCSS.leaderboardLink}>Lorem ipsum</Link>
                            </div>
                            <h1 style={pageCSS.leaderboardPoints}>108pts</h1>
                        </div>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}