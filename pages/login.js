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
                    <Image src="/images/login.png" alt="Logged In" width="1280" height="1280" />
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
                <Image src="/images/login_failed.png" alt="Logged In" width="1280" height="1280" />
                <h1>Not signed in</h1>
                <button onClick={redirectToGame}>Sign in/Sign up</button>
            </CenterContent>
        </div>
    )
}