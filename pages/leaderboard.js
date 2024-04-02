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

export default function Leaderboard({ playerScores, highScores, recentScores }) {
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
                        <h1>Top 3 Players</h1>
                        {playerScores.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <h2 style={pageCSS.leaderboardPlace}>{index + 1}</h2>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                </div>
                                <h1 style={pageCSS.leaderboardPoints}>{res.totalScore}pts</h1>
                            </div>
                        ))}
                    </div>
                    <div id='boxInside'>
                        <h1>High Scores</h1>
                        {highScores.slice(0,3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                    <a>{res.gameName}</a>
                                </div>
                                <h1 style={pageCSS.leaderboardPoints}>{res.maxScore}pts</h1>
                            </div>
                        ))}
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Scores</h1>
                        {recentScores.slice(0,3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                    <a>{res.gameName}</a>
                                </div>
                                <h1 style={pageCSS.leaderboardPoints}>{res.score}pts</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    // Fetch Top Player stats from MongoDB
    const resTop = await fetch(process.env.IP_URL + '/api/database/topplayers');
    const playerScores = await resTop.json();

    // Fetch Game Highscore stats from MongoDB
    const resGHS = await fetch(process.env.IP_URL + '/api/database/highscores');
    const highScores = await resGHS.json();

    // Fetch Recent Score stats from MongoDB
    const resRec = await fetch(process.env.IP_URL + '/api/database/recentscores');
    const recentScores = await resRec.json();
    
    // Pass player scores data to the component
    return {
        props: {
            playerScores,
            highScores,
            recentScores,

        },
        // Re-generate the page at most once every 5 minutes (300 seconds)
        revalidate: 300,

    }
}