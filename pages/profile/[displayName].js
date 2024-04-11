import Head from 'next/head'
import Header from '../components/Header/index.js'
import Footer from '../components/Footer/index.js'
import CenterContent from '../components/CenterContent/index.js'
import Image from 'next/image.js'
import { formatRelativeDate } from '../../util/time.js'
import { profileInfo } from '../../util/mongoBackendQuery.js'

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
                            {playerProfile.playerInfo.profilePic == undefined ? 
                                    <Image 
                                        src="/images/default-avatar.png" 
                                        width={100} 
                                        height={100} 
                                        alt="Default avatar" 
                                        style={{borderRadius: '50%'}}
                                    /> 
                                    :
                                    <Image 
                                        src={playerProfile.playerInfo.profilePic} 
                                        width={100} 
                                        height={100} 
                                        alt="Custom avatar" 
                                        style={{borderRadius: '50%'}}
                                    />
                            }
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

export async function getServerSideProps({ query }) {
    const displayName = query.displayName;
    let playerProfile = null;

    try {
        // Query player result
        let playerRes = await profileInfo(displayName);
        if (playerRes == undefined) {
            throw new Error("Profile not found for given displayName")

        }
        playerProfile = JSON.parse(JSON.stringify(playerRes));

    } catch (e) {
        // If profile doesn't exist, return 404 
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    }

    // Pass fetched playerProfile as props
    return {
        props: {
            playerProfile,

        },
    };
}