// TODO: Integrate with MongoDB and get data to fill

import Head from 'next/head'
import Header from '../components/Header/index.js'
import Footer from '../components/Footer/index.js'
import CenterContent from '../components/CenterContent/index.js'
import Image from 'next/image.js'

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
    profileA: {
        marginTop: "0.25rem",
        marginBottom: "0.25rem",

    },
    profileImage: {
        height: "100%",
        maxHeight: "10rem",
        maxWidth: "10rem",
        objectFit: "contain"

    }
}

export default function Profile() {
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
                                <h1>Lorem Ipsum</h1>
                                <a style={pageCSS.profileA}>Global rank: 1</a>
                                <a style={pageCSS.profileA}>Last active today</a>
                            </div>
                            <Image src="/images/default-avatar.png" width={"100"} height={"100"} alt="Default avatar" style={pageCSS.profileImage} />
                        </div>
                    </div>
                    <div id='boxInside'>
                        <h1>Recent Activity</h1>
                        <a>None</a>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}