import Head from 'next/head'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import CenterContent from './components/CenterContent/index.js'

import Image from 'next/image';

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
                            <h1>Our Project</h1>
                            <a>Our vision is to create a Club Penguin clone since the original site was shut down. Our goal is for our site to be easy to access, fun, and educational for all to enjoy. Our main objective is to showcase and inform people of the many habitat struggles penguins face in today\'s world, as well as provide an environment for users to meet new people online and participate in in-game competitions. Our game will be web-native and portable.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Project Progress</h1>
                            <ul>
                                <li>Plan to introduce at least 3 more minigames into Institution Penguin</li>
                                <li>At least one of which will focus on educating users about the impacts of climate change on penguins and antarctic habitats in general</li>
                                <li>Add multiplayer capabilities to our game, which will require us to implement a database using MongoDB </li>
                                <li>Refine our user authentication pipeline, and add functionalities to support multiprocessing to ensure that the game remains responsive even when many players are logged on at once</li>
                                <li>Refine our animations and improve our sprite movement functionality in general as well as add custom art assets to give Institution Penguin more novelty.</li>
                            </ul>
                        </div>
                        <div id='boxInside'>
                            <h1>Our Instructor</h1>
                            <h2>Patrick Kinnicutt</h2>
                            <ul>
                                <li>Department head of Computer Science at CMU</li>
                                <li>Ph.D., Information Technology in Civil Engineering, Massachusetts Institute of Technology, 1995</li>
                                <li>M.S., Civil and Environmental Engineering, Massachusetts Institute of Technology, 1991</li>
                                <li>B.S., Civil Engineering, Massachusetts Institute of Technology, 1989</li>
                            </ul>
                        </div>
                        <div id='boxInside'>
                            <h1>Our Team</h1>
                            <a>Bryce Robinson, senior majoring in Computer Science.</a>
                            <a>Alex Benkarski, senior majoring in Computer Science.</a>
                            <a>Jonathan Gregory, senior majoring in Computer Science, Cybersecurity, and Mathematics.</a>
                            <a>Jerry Kephart, senior majoring in Computer Science.</a>
                            <a>August Meyers, senior majoring in Computer Science, Information Technology, and Mathematics.</a>
                            <a>Trey Miller, senior majoring in Computer Science.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Our Resources</h1>
                            <ul>
                                <li>With the project being in its youngest stages, we took forth on this and planned to think ahead by building the project with a full Continuous Integration/Continuous Development (CI/CD) pipeline from the start.</li>
                                <li> With the use of Github, Docker, and NodeJS, we were able to make a competent and tested DevOps experience.</li>
                                <li>While GitHub establishes the CI/CD pipeline, Docker runs the pipeline. Docker can be thought of as a container of code – whereas a normal virtual machine runs an entire host operating system, Docker sits on top of the host kernel and only runs specific parts. The lack of a kernel makes Docker containers much smaller, faster, and quicker to spin up.</li>
                                <li>We used  NodeJS, which is just a runtime of Javascript on the Chrome engine, but NodeJS is kind of like Docker in the sense that it can do almost anything. In this case, we implemented NextJS on NodeJS to facilitate a web router and full stack equivalent of VueJS.</li>
                                <li>Github, Docker, and NodeJS make up the majority of our DevOps pipeline. GitHub provides the important source control and actions that allow the CI/CD methods to run. Docker runs them, literally.</li>
                                <li>NodeJS contains all the actual web parts and testing to ensure that it meets our goals.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}