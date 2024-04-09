import Head from 'next/head'
import Header from '../components/Header/index.js'
import Footer from '../components/Footer/index.js'
import CenterContent from '../components/CenterContent/index.js'
import Image from 'next/image.js'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { formatRelativeDate } from '../../util/time.js'

const pageCSS = {
    profileTop: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    profileLeft: {
        display: "flex",
        flexDirection: "column",

    },
    paddedBox: {
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        minWidth: "10rem",
        display: "block"
    },
    profileImage: {
        height: "100%",
        maxHeight: "10rem",
        maxWidth: "10rem",
        objectFit: "contain"

    },
    recentScore: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",

    },
    points: {
        fontSize: "1.3rem",

    },
}

export default function Profile({ playerProfile }) {
    const router = useRouter();

    // If profile isn't found
    useEffect(() => {
        if (Boolean(playerProfile.error)) {
            router.push('/404');
            return () => { }

        }
    }, [playerProfile.error, router]);

    // If profile is found
    if (!playerProfile.error) {
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
                            <div style={pageCSS.profileTop}>
                                <div style={pageCSS.profileLeft}>
                                    <h1>{playerProfile.playerInfo.displayName}</h1>
                                    <a style={pageCSS.paddedBox}>Total points: {playerProfile.globalScore}</a>
                                    <a style={pageCSS.paddedBox}>Global rank: {playerProfile.globalRank}</a>
                                    <a style={pageCSS.paddedBox}>Last active: {formatRelativeDate(playerProfile.playerInfo.lastActivityDate)}</a>
                                    <a style={pageCSS.paddedBox}>Member since: {formatRelativeDate(playerProfile.playerInfo.creationDate)}</a>
                                </div>
                                <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.profileImage} />
                            </div>
                        </div>
                        <div id='boxInside'>
                            <h1>Recent Activity</h1>
                            {/* Conditional rendering of recent scores */}
                            {playerProfile.recentScores && playerProfile.recentScores.length > 0 ? (
                                playerProfile.recentScores.slice(0, 3).map((res, index) => (
                                    <div style={pageCSS.recentScore} key={index}>
                                        {/* Score information */}
                                        <a style={pageCSS.paddedBox}>{res.gameName} {formatRelativeDate(res.timestamp)}</a>
                                        {/* Score value */}
                                        <h1 style={pageCSS.points}>{res.value}pts</h1>
                                    </div>
                                ))
                            ) : (
                                // Display a message if no recent scores exist
                                <a>No recent activity</a>
                            )}
                        </div>
                    </div>
                </CenterContent>
                <Footer />
            </div>
        )
    }
    // If not found
    return <div />

}

export async function getServerSideProps({ params }) {
    // TODO: Just do the DB query here and skip the fake API
    const { id } = params;

    // Fetch profile information from MongoDB
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/read/profile/${id}`);
    const playerProfile = await res.json();

    // Pass fetched playerProfile as props
    return {
        props: {
            playerProfile,

        },
    };
}