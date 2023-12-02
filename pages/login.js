import { useSession, getSession, signIn, signOut } from "next-auth/react"
import Head from 'next/head'
import Header from './components/Header/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image';

export default function Login() {

    const { data: session, status: status } = useSession();
    console.log(useSession())

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
                    <Image src="/images/logged-in.png" alt="Logged In" width="1280" height="1280" />
                    <h1>Signed in as {session.user.name}</h1>
                    <button onClick={() => signOut()}>Sign out</button>
                    <button onClick={redirectToGame}>Return to game</button>
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
                <h1>Not signed in</h1>
                <button onClick={() => signIn()}>Sign in/Sign up</button>
            </CenterContent>
        </div>
    )
}

function redirectToGame() {
    location.href = "/404";
}
