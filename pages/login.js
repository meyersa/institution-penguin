import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import Head from 'next/head'
import Header from './components/Header/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image';

export default function Login() {
    const { data: session, status: status } = useSession();
    const router = useRouter();

    const redirectToGame = () => {
        router.push('./Game/lobby.html');

    };

    if (status === "authenticated") {
        // add login/sign-up logic 
        return (
            <div>
                <Head>
                    <title>Institution Penguin</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <CenterContent>
                    <div id='boxDisplay'>
                        <div id='boxInside' style={{ justifyContent: 'center', alignItems: 'center', height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(\'/images/login.png\')' }}>
                            <h1>Signed in as {session.user.name}</h1>
                            <button onClick={() => signOut()} style={{margin: "0.2rem"}}>Sign out</button>
                            <button onClick={redirectToGame} style={{margin: "0.2rem"}}>Return to game</button>
                        </div>
                    </div>
                </CenterContent>
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
                    <div id='boxInside' style={{ justifyContent: 'center', alignItems: 'center', height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(\'/images/login_failed.png\')' }}>
                        <h1>Please sign in below</h1>
                        <button onClick={() => signIn()}>Sign in/Sign up</button>
                    </div>
                </div>
            </CenterContent>
        </div>
    )
}
