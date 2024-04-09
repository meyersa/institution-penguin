import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Header from "./components/Header/index.js";
import CenterContent from "./components/CenterContent/index.js";
import EditableForm from "./components/EditableForm/index.js";

export default function Login() {
  const { data: session, status: status } = useSession();
  const router = useRouter();

  // Redirect to game button
  const redirectToGame = () => {
    router.push("/");
  };

  // Redirect to profile button
  const redirectToProfile = () => {
    router.push(`/profile/${session.user.name}`);
  };

  /*
   * Form handling
   */
  let userDescription =
    "Velit irure velit sint cillum enim mollit tempor aliqua. Lorem et elit Lorem ullamco pariatur reprehenderit veniam eu eiusmod. Anim Lorem incididunt aliqua incididunt proident nostrud. Incididunt sunt laborum sit ut anim exercitation.";
  let profilePicture = "https://institutionpenguin.com/images/default-avatar.png";
  let displayName = "OG_Penguin";

  // Handle submit button
  const handleSubmit = (event) => {
    console.log("Submitted description:", description);

    };

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Institution Penguin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <CenterContent>
          <div id="boxDisplay">
            <div id="boxInside" style={{ gap: "2rem" }}>
              <h1 style={{margin: 'auto'}}>Signed in as {session.user.name}</h1>
              <EditableForm
                labelName="Description"
                existingValue={userDescription}
                handleSubmit={handleSubmit}
              />
              <EditableForm
                labelName="Profile Picture"
                existingValue={profilePicture}
                handleSubmit={handleSubmit}
              />
              <EditableForm
                labelName="Display Name"
                existingValue={displayName}
                handleSubmit={handleSubmit}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  padding: ".3em",
                  margin: ".3em",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <button onClick={() => signOut()}>Sign out</button>
                <button onClick={redirectToGame}>Return to game</button>
                <button onClick={redirectToProfile}>Your public profile</button>
              </div>
            </div>
          </div>
        </CenterContent>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Institution Penguin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CenterContent>
        <div id="boxDisplay">
          <div
            id="boxInside"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: "url('/images/login_failed.png')",
            }}
          >
            <h1>Please sign in below</h1>
            <button onClick={() => signIn()}>Sign in/Sign up</button>
          </div>
        </div>
      </CenterContent>
    </div>
  );
}
