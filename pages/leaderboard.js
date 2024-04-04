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

export default function Leaderboard({ playerScores, highScores, recentScores }, ) {

    // Last active calculations
    function formatRelativeDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        const diffMs = now - date;
        const diffSeconds = Math.round(diffMs / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        const diffDays = Math.round(diffHours / 24);

        if (diffSeconds < 60) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else {
            return `${diffDays} days ago`;
        }
    }

    // Not fetched
    if (!Boolean(playerScores) && !Boolean(highScores) && !Boolean(recentScores)) {
        
        return (
            <div>
                <a>Loading...</a>
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
                        {playerScores.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardNested} key={index}>
                                <h2 style={pageCSS.leaderboardPlace}>{index + 1}.</h2>
                                <div style={pageCSS.leaderboardOutside}>
                                    <div style={pageCSS.leaderboardInside}>
                                        <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                        <div style={pageCSS.leaderboardNested}>
                                            <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
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
                        {highScores.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <div style={pageCSS.leaderboardNested}>
                                        <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
                                        <a style={pageCSS.leaderboardSmallText}>{res.gameName} {formatRelativeDate(res.timestamp)}</a>
                                    </div>
                                </div>
                                <h1 style={pageCSS.leaderboardPoints}>{res.maxScore}pts</h1>
                            </div>
                        ))}
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Scores</h1>
                        {recentScores.slice(0, 3).map((res, index) => (
                            <div style={pageCSS.leaderboardOutside} key={index}>
                                <div style={pageCSS.leaderboardInside}>
                                    <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.leaderboardImage} />
                                    <div style={pageCSS.leaderboardNested}>
                                        <Link href={`/profile/${res.playerID}`} style={pageCSS.leaderboardLink}>{res.displayName}</Link>
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
    let playerScores = null;
    let highScores = null;
    let recentScores = null;
    let resTop = null; 
    let resGHS = null; 
    let resRec = null;

    try {
        // Fetch Top Player stats from MongoDB
        resTop = await fetch('/api/database/topplayers');
        playerScores = await resTop.json();

        // Fetch Game Highscore stats from MongoDB
        resGHS = await fetch('/api/database/highscores');
        highScores = await resGHS.json();

        // Fetch Recent Score stats from MongoDB
        resRec = await fetch('/api/database/recentscores');
        recentScores = await resRec.json();

    } catch (error) {
        console.error("Failed to fetch leaderboard API queries", error)

    }


    // Pass player scores data to the component
    return {
        props: {
            playerScores,
            highScores,
            recentScores,

        },
        // Re-generate the page at most once every minute
        revalidate: 60,

    }
}