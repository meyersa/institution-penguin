import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'
import Image from 'next/image.js'

export default function About() {
    return (
        <div>
            <Head>
                <title>Institution Penguin</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <CenterContent>
                <div>
                    <div id='boxDisplay'>
                        <div id='boxInside'>
                            <h1>Games</h1>
                            <h2>Lobby</h2>
                            <Image src="/demo/lobby.png" height="576" width="1024" alt="Lobby picture" style={{height: "auto"}}/>
                            <a>Okay, maybe the lobby isn&apos;t a game, but it is loaded like one. Utilizing a lot of Javascript to draw sprites onto a canvas element, this may as well be a 2d game. The lobby also serves as the jump point between games. In the future it will include even more!</a>
                            <h2>FlappyPenguin</h2>
                            <Image src="/demo/flappypenguin.png" height="576" width="1024" alt="FlappyPenguin picture" style={{height: "auto"}} />
                            <a>In the style of Flappy Bird, but with everyone&apos;s favorite mammal. This game challenges your ability to jump over incoming snowmen but also dodge flying snowballs. Can you make it!?</a>
                            <h2>PuffleRecycler</h2>
                            <Image src="/demo/pufflerecycler.png" height="576" width="1024" alt="PuffleRecycler picture" style={{height: "auto"}} />
                            <a>In this daring adventure you&apos;ll try and keep as many pieces of plastic from getting into the penguin&apos;s habitat, but don&apos;t remove their fish!</a>
                            <h2>TriviaPenguin</h2>
                            <Image src="/demo/triviapenguin.png" height="576" width="1024" alt="TriviaPenguin picture" style={{height: "auto"}} />
                            <a>Put your knowledge of Penguins and habitat loss to the test in this Jeopardy style game. Answer as fast as possible and you might get some bonus points!</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Other Pages</h1>
                            <h2>Leaderboard</h2>
                            <Image src="/demo/leaderboard.png" height="576" width="1024" alt="Leaderboard picture" style={{height: "auto"}} />

                            <a>Checkout top players or your friends, or maybe see who is currently active!</a>
                            <h2>Profiles</h2>
                            <Image src="/demo/profile.png" height="576" width="1024" alt="Profile picture" style={{height: "auto"}} />

                            <a>See how many points other players have amassed, or see how many points they have been getting lately!</a>
                            <h2>Settings</h2>
                            <Image src="/demo/settings.png" height="576" width="1024" alt="Settings picture" style={{height: "auto"}} />
                            <a>Customize your name, description, and profile picture. In the future you&apos;ll be able to style your penguin how you want!</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Technology Used</h1>
                            <a>Taking on the size of a full project, with almost 700 commits on Github now, Institution Penguin has become quite the capstone. Institution Penguin posts a full CI/CD pipeline, front end framework, games, backend API, and database with cloud replication. Basically anything that seemed like best practice for a project was implemented here.</a>
                            <h2>NodeJS</h2>
                            <a>Utilizing the React framework, NextJS integrates a web router that lets us define both web structure and web routes, including APIs, in a seamless manner.</a>
                            <h2>NextJS</h2>
                            <a>Arguably the most important part about the project, NextJS implements the React framework with a full NodeJS router. This allows us to have an easy to define frontend alongside a modular backend.</a>
                            <h2>NextAuth</h2>
                            <a>In order to offload authentication from the server, using NextJS (NextAuth) was the obvious choice. The configurable backend lets us define everything we could need to include multiple OAuth providers.</a>
                            <h2>PixiJS</h2>
                            <a>While some of our games are made without any additional libraries, PixiJS&apos; 2d game engine makes the more complicated games much easier to develop.</a>
                            <h2>Github</h2>
                            <a>The heart of the codebase, Github lets our team develop different parts of the project simultaneously while providing visibility, automated testing, and automated deployment.</a>
                            <h2>Docker</h2>
                            <a>While containerization is greatly helpful for ensuring builds are consistent between developers on different platforms, Docker also makes our CI/CD pipelines easier with predictable building and encapsulation.</a>
                        </div>

                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}
