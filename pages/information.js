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
                            <h1>Habitat Loss and Penguin Conservation</h1>
                            <a>Concerns about habitat loss are significant in penguin conservation efforts. According to ChatGPT, habitat loss poses a serious threat to many penguin species worldwide. This loss is primarily attributed to human activities such as climate change, overfishing, pollution, and habitat destruction.</a>
                        </div>
                        <div id='boxInside' style={{width: "fit-content", margin: "1rem auto"}}>
                            <Image src="https://friendoftheearth.org/wp-content/uploads/Penguins-web.png" height="500" width="500" alt="poster about habitat loss" style={{margin: "auto", }}/>
                            <a>source: friendoftheearth.org</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Climate Change</h1>
                            <a>Climate change, driven by human-induced greenhouse gas emissions, is causing rapid shifts in the Earth&apos;s climate, leading to rising sea levels and altering ocean currents. These changes directly impact penguins&apos; breeding and feeding grounds, disrupting their natural habitat and food sources.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Overfishing</h1>
                            <a>Overfishing, another major concern, depletes fish stocks, which are essential for penguins&apos; survival. Penguins rely on abundant fish populations to feed themselves and their chicks during the breeding season. With overfishing, penguins struggle to find enough food to sustain themselves and their offspring.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Pollution</h1>
                            <a>Pollution, including oil spills, plastic pollution, and chemical contamination, further degrades penguins&apos; habitats. These pollutants can poison penguins, destroy their nesting sites, and disrupt their behavior and reproductive patterns.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Human Disturbance</h1>
                            <a>Human disturbance, such as tourism, fishing activities, and infrastructure development, also disrupts penguins&apos; natural behaviors and breeding cycles. Increased human presence can lead to habitat destruction, disturbance of nesting sites, and stress on penguin populations.</a>
                        </div>
                        <div id='boxInside'>
                            <h1>Conservation Efforts</h1>
                            <a>In light of these challenges, conservation efforts are crucial to protect penguins and their habitats. Conservation initiatives include establishing marine protected areas, reducing greenhouse gas emissions, regulating fishing practices, cleaning up pollution, and promoting sustainable tourism.</a>
                        </div>
                    </div>
                </div>
            </CenterContent>
            <Footer />
        </div>
    )
}
