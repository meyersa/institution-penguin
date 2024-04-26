import React from "react";
import Link from 'next/link'

import styles from './footer.module.css'

const facts = [
  "Emperor Penguins are the largest of all penguin species, standing up to 3.7 feet tall.",
  "Antarctica is home to several penguin species, including Emperor and Adélie Penguins.",
  "Overfishing reduces the availability of prey species for penguins, impacting their food sources.",
  "The Galápagos Penguin is the only penguin species found north of the equator.",
  "Climate change leads to melting sea ice, affecting penguins' access to food and breeding grounds.",
  "The African Penguin is also known as the Jackass Penguin due to its donkey-like braying call.",
  "Several penguin species, including the African and Galápagos Penguins, are classified as Endangered.",
  "Oil spills pose a significant threat to penguins, contaminating their feathers and harming their health.",
  "Penguins belong to the family Spheniscidae and are flightless marine birds.",
  "Habitat destruction from human activities such as coastal development and pollution threatens penguin nesting sites.",
  "Adélie Penguins are known for their distinctive black and white plumage and bright red bills.",
  "Several penguin populations have experienced significant declines due to habitat loss and other threats.",
  "Conservation efforts for penguins include establishing marine protected areas and promoting sustainable fishing practices.",
  "Chinstrap Penguins are named for the thin black band under their chin.",
  "Krill is a primary food source for many penguin species, and its decline due to overfishing impacts penguins' diets.",
  "Rockhopper Penguins are known for their distinctive hopping movements over rocky terrain.",
  "Pollution from plastic debris and chemicals in the ocean poses a threat to penguins and their habitats.",
  "Loss of suitable nesting sites due to habitat destruction makes it challenging for penguins to raise their chicks.",
  "Magellanic Penguins migrate thousands of miles each year, traveling between breeding and feeding grounds.",
  "Penguins can become accidentally entangled in fishing gear, leading to injuries or death as bycatch.",
  "Penguins gather in large breeding colonies during the breeding season, where they mate and raise their chicks.",
  "Little Penguins are the smallest penguin species, reaching only about 13 inches in height.",
  "Sea level rise, a consequence of climate change, can submerge penguin nesting sites and feeding grounds.",
  "Emperor and King Penguins belong to the genus Aptenodytes, known as the 'great' or 'true' penguins.",
  "Human presence near penguin colonies can cause stress and disrupt breeding and feeding behaviors.",
  "King Penguins are the second-largest penguin species, with striking orange markings on their necks and chests.",
  "Establishing marine protected areas helps safeguard penguin habitats and important foraging areas.",
  "Many penguin species are classified as Threatened or Endangered due to habitat loss, climate change, and other factors.",
  "The Yellow-eyed Penguin is one of the rarest penguin species, found only in New Zealand.",
  "Commercial fishing operations compete with penguins for prey species such as fish and krill.",
  "Macaroni Penguins have distinctive yellow crests on their heads and are known for their loud, braying calls.",
  "Cape Verde Shearwater populations are declining due to habitat loss and predation by invasive species.",
  "Some penguin species may become 'climate refugees,' forced to migrate or adapt to new habitats due to climate change.",
  "The Falkland Islands are home to several penguin species, including the Magellanic and Rockhopper Penguins.",
  "Humboldt Penguins inhabit the coasts of South America, where they face threats from habitat loss and overfishing.",
  "St. Kilda Penguins, also known as Blue Penguins, are the smallest penguin species in the Northern Hemisphere.",
  "Blue Penguins, also called Little Penguins or Fairy Penguins, are found in Australia and New Zealand.",
  "Chatham Islands Penguins, or Chatham Island Penguins, are endemic to the Chatham Islands of New Zealand.",
  "The Yellow-eyed Penguin Trust works to conserve and protect the Yellow-eyed Penguin and its habitat in New Zealand."
]

const getRandomFact = () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts[randomIndex];
};

export default function Header() {
  return (
    <div className={styles.footer}>
      <div className={styles.footertext}>
        <a>&copy; InstitutionPenguin.com {(new Date()).getFullYear()}</a>
        <a className={styles.mobile} style={{display: 'none'}}>|</a>
        <Link className={styles.link} href="/about">About</Link>
        <Link className={styles.link} href="/leaderboard">Leaderboard</Link>
        <Link className={styles.link} href="/login">Login</Link>
        <Link className={styles.link} href="/information">Info</Link>
        <Link className={styles.link} href="/demo">Demo</Link>
        <Link className={styles.link} href="https://github.com/meyersa/institution-penguin">Github</Link>
        <a>Images provided by Dalle 3 and Stable Diffusion Web</a>
        <a>Did You Know: {getRandomFact()}</a>

      </div>
    </div>
  );
};
