import Head from "next/head";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import CenterContent from "./components/CenterContent/index.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { loadQuestions } from "../util/mongoBackendQuery.js";
import { submitScore } from "../public/util/submitScore.js";

export default function TriviaPenguin({ quizQuestions }) {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [canLoad, setCanLoad] = useState(false);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Conditions to be viewing page
  useEffect(() => {
    // Set initial compatibility for window size
    if (window.innerWidth <= 1000) {
      router.push("/incompatible");
      return () => {};
    }

    // Not authenticated and is compatible
    if (authStatus !== "authenticated" && authStatus !== "loading") {
      router.push("/login");
      return () => {};
    }

    // Conditions are met
    if (authStatus === "authenticated") {
      setCanLoad(true);
    }
  }, [router, authStatus]);

  // If questions are not loaded
  if (!quizQuestions) {
    return (
      <div id="loading">
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <CenterContent>
          <div id="boxDisplay">
            <div id="boxInside">
              <h1>TriviaPenguin is still populating questions</h1>
              <a>Please check back soon to see if it has finished loading.</a>
            </div>
          </div>
        </CenterContent>
        <Footer />
      </div>
    );
  }

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  // Shuffle the array of questions
  const shuffledQuestions = shuffleArray(quizQuestions);

  // Handle user's answer
  const answerQuestion = (answer) => {
    const currentQuestion = shuffledQuestions[questionIndex];
    const isCorrect = answer == Boolean(currentQuestion.answer);

    if (isCorrect) {
      const currentScore = score + 5 * multiplier;
      setScore(currentScore);
      setMultiplier(multiplier * 1.3);
    } else {
      endGame(); // End game if the answer is wrong
      return; // Return early to prevent updating state
    }

    setQuestionIndex(questionIndex + 1);
    setAnsweredQuestions([...answeredQuestions, currentQuestion._id]);
  };

  const startGame = () => {
    document.getElementById("startPrompt").style.display = "none";
    document.getElementById("question-box").style.display = "block";
    document.getElementById("canvas").style.filter = "blur(0)";
  };

  // End the game when all questions are answered
  const endGame = () => {
    document.getElementById("endPrompt").style.display = "block";
    document.getElementById("question-box").style.display = "none";
    document.getElementById("canvas").style.filter = "blur(5px)";

    submitScore(score, "triviapenguin");
  };

  // Display the game interface
  if (canLoad) {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div id="startPrompt">
          <div
            id="boxInside"
            style={{
              margin: "0",
              position: "absolute",
              top: "40%",
              left: "50%",
              zIndex: "1",
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--transparent-grey)",
              width: "80dvh",
            }}
          >
            <h1>Welcome to the Trivia Game!</h1>
            <a>Answer as many true or false questions about Penguins as fast as you can!</a>
            <button style={{ width: "100%" }} onClick={() => startGame()}>
              Start Game
            </button>
          </div>
        </div>
        <div id="endPrompt" style={{ display: "none" }}>
          <div
            id="boxInside"
            style={{
              margin: "0",
              position: "absolute",
              top: "40%",
              left: "50%",
              zIndex: "1",
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--transparent-grey)",
              width: "80dvh",
            }}
          >
            <h1>Game Over!</h1>
            <a>
              You answered {answeredQuestions.length} questions for a score of {score}
            </a>
            <div style={{ width: "100%", display: "flex", gap: "1rem", flexDirection: "row" }}>
              <button style={{ width: "100%" }} onClick={() => router.reload()}>
                Play Again
              </button>
              <button style={{ width: "100%" }} onClick={() => router.push("/")}>
                Return to lobby
              </button>
            </div>
          </div>
        </div>
        <div id="game">
          <div
            id="canvas"
            style={{
              backgroundImage: "url('/triviapenguin/background.png')",
              backgroundPosition: "center",
              backgroundSize: "contain",
              filter: "blur(5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {questionIndex < shuffledQuestions.length && (
              <div id="question-box" style={{ display: "none", maxWidth: "80%" }}>
                <h2
                  style={{ color: "var(--white)", backgroundColor: "var(--blue)", padding: "1rem" }}
                >
                  Question: {shuffledQuestions[questionIndex].question}
                </h2>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                  <button
                    id="styled-button"
                    style={{ width: "100%" }}
                    onClick={() => answerQuestion(true)}
                  >
                    True
                  </button>
                  <button
                    id="styled-button"
                    style={{ width: "100%" }}
                    onClick={() => answerQuestion(false)}
                  >
                    False
                  </button>
                </div>
              </div>
            )}
            {questionIndex >= shuffledQuestions.length && endGame()}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <div />;
  }
}

// Fetch questions from MongoDB on the server-side
export async function getStaticProps() {
  let quizQuestions = null;

  try {
    let quizRes = await loadQuestions();

    if (quizRes == undefined) {
      throw new Error("Could not load questions");
    }
    quizQuestions = JSON.parse(JSON.stringify(quizRes));
  } catch (error) {
    console.error("Failed to load questions from MongoDB", error);

    return {
      props: {
        quizQuestions: null,
      },
      // Trigger aggressive reload
      revalidate: 15,
    };
  }

  // Success
  return {
    props: {
      quizQuestions,
    },
    revalidate: 60,
  };
}
