// TODO: Fix profile picture not showing up

import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image.js'
import Link from 'next/link.js'
import { formatRelativeDate } from '../util/time.js'
import { topPlayers, highScores, recentScores } from '../util/mongoBackendQuery.js'

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
    leaderboardImage: {
        width: "auto",
        height: "100%",
        maxHeight: "3rem",
        objectFit: "contain"
    },
    leaderboardLink: {
        minWidth: "7rem",
        fontSize: "1.1rem",
        textDecoration: "underline",
        textDecorationColor: "rgb(10, 186, 250)",
        textDecorationThickness: "0.2rem",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        marginBottom: "0.1rem",
    },
    leaderboardPoints: {
        fontSize: "1.3rem",
        alignSelf: "center"
    },
    leaderboardSmallText: {
        fontSize: "0.7rem",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        marginTop: "0.1rem",
        marginLeft: "0.9rem",
        overflow: "hidden",
    },
    leaderboardNested: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    leaderboardPlace: {
        margin: "0 0.6rem",
        borderBottom: "solid",
        borderColor: "var(--light-white)"
    }
}

export default function Leaderboard({ topPlayersResult, highScoresResult, recentScoresResult },) {
    // Not fetched
    if (!topPlayersResult || !highScoresResult || !recentScoresResult) {
        return (
            <div id="loading">
                <Head>
                    <title>Institution Penguin</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <CenterContent>
                    <div id='boxDisplay'>
                        <div id='boxInside'>
                            <h1>Leaderboard is still populating</h1>
                            <a>Please check back soon to see if it has finished loading.</a>
                        </div>
                    </div>
                </CenterContent>
                <Footer />
            </div>
        )
    }

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
                        {topPlayersResult.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardNested} key={index}>
                                <h2 style={pageCSS.leaderboardPlace}>{index + 1}.</h2>
                                <div style={pageCSS.leaderboardOutside}>
                                    <div style={pageCSS.leaderboardInside}>
                                        <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                        <div style={pageCSS.leaderboardNested}>
                                            <Link href={`/profile/${res.displayName}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                            <a style={pageCSS.leaderboardSmallText}>Last seen {formatRelativeDate(res.lastActivityDate)}</a>
                                        </div>
                                    </div>
                                    <h1 style={pageCSS.leaderboardPoints}>{res.totalScore}pts</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id='boxInside'>
                        <h1>High Scores</h1>
                        {highScoresResult.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <div style={pageCSS.leaderboardNested}>
                                        <Link href={`/profile/${res.displayName}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                        <a style={pageCSS.leaderboardSmallText}>{res.gameName} {formatRelativeDate(res.timestamp)}</a>
                                    </div>
                                </div>
                                <h1 style={pageCSS.leaderboardPoints}>{res.maxScore}pts</h1>
                            </div>
                        ))}
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Scores</h1>
                        {recentScoresResult.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <div style={pageCSS.leaderboardNested}>
                                        <Link href={`/profile/${res.displayName}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                        <a style={pageCSS.leaderboardSmallText}>{res.gameName} {formatRelativeDate(res.timestamp)}</a>
                                    </div>
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
    let topPlayersResult = null;
    let highScoresResult = null;
    let recentScoresResult = null;

    try {
        // Fetch Top Player stats from MongoDB
        let topRes = await topPlayers();

        if (topRes == undefined) {
            throw new Error('Could not query top players')

        }
        topPlayersResult = JSON.parse(JSON.stringify(topRes));

        // Fetch Game Highscore stats from MongoDB
        let highRes = await highScores();
        if (topRes == undefined) {
            throw new Error('Could not query high scores')

        }
        highScoresResult = JSON.parse(JSON.stringify(highRes));

        // Fetch Recent Score stats from MongoDB
        let recentRes = await recentScores();
        if (recentRes == undefined) {
            throw new Error('Could not query recent scores')

        }
        recentScoresResult = JSON.parse(JSON.stringify(recentRes));

    } catch (error) {
        console.error("Failed to fetch leaderboard API queries", error)
        return {
            props: {
                topPlayersResult: null,
                highScoresResult: null,
                recentScoresResult: null,
    
            },
            // Re-generate the page at most once every minute
            revalidate: 15,
    
        }
    }

    // Pass player scores data to the component
    return {
        props: {
            topPlayersResult,
            highScoresResult,
            recentScoresResult,

        },
        // Re-generate the page at most once every minute
        revalidate: 60,

    }
}