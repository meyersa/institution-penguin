import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Header from "./components/Header/index.js";
import CenterContent from "./components/CenterContent/index.js";
import { useState } from "react";

const pageCSS = {
  topProfile: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  profileHeader: {
    margin: "auto",
  },
  profileImage: {
    maxHeight: "10dvh",
    margin: "0.3em",
    borderRadius: "50%",
  },
  profileForm: {
    display: "flex",
    gap: "0.6rem",
    width: "100%",
    margin: "0.3em",
    padding: "0.3em",
    justifyContent: "space-between",
    backgroundColor: "var(--transparent-blue)",
    borderRadius: "0.5rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  formLabel: {
    color: "var(--light-white)",
    minWidth: "7rem",
  },
  formTextArea: {
    minWidth: "60%",
    minHeight: "5em",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "var(--blue)",
    color: "var(--light-white)",
    border: "none",
    outline: "none",
    margin: "auto",
    padding: "0.5rem",
  },
  formReadOnly: {
    minHeight: "5em",
    minWidth: "60%",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "var(--blue)",
    color: "var(--light-white)",
    border: "none",
    outline: "none",
    margin: "auto",
    padding: "0.5rem",
    flex: "1",
  },
  editButton: {
    color: "var(--light-white)",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    outline: "none",
  },
  leftDiv: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    margin: "auto",
    flex: "0 0 auto",
  },
};

export default function Login() {
  /*
   * Session handling
   */
  const { data: session, status: status } = useSession();
  const router = useRouter();

  const redirectToGame = () => {
    router.push("/");
  };

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

  const [description, setDescription] = useState(userDescription);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted description:", description);
    setIsEditing(false);
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
          <div id="boxDisplay">
            <div id="boxInside" style={{ gap: "2rem" }}>
              <h1 style={pageCSS.profileHeader}>Signed in as {session.user.name}</h1>
              <form onSubmit={handleSubmit} style={pageCSS.profileForm}>
                <div style={pageCSS.leftDiv}>
                  <label htmlFor="description" style={pageCSS.formLabel}>
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={isEditing ? handleSubmit : handleEditClick}
                    style={pageCSS.editButton}
                  >
                    {isEditing ? "Submit" : "Edit"}
                  </button>
                </div>
                {isEditing ? (
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={pageCSS.formTextArea}
                  />
                ) : (
                  <textarea
                    id="description"
                    value={description}
                    readOnly
                    style={pageCSS.formReadOnly}
                  />
                )}
              </form>
              <form onSubmit={handleSubmit} style={pageCSS.profileForm}>
                <div style={pageCSS.leftDiv}>
                  <label htmlFor="description" style={pageCSS.formLabel}>
                    Profile Picture
                  </label>
                  <button
                    type="button"
                    onClick={isEditing ? handleSubmit : handleEditClick}
                    style={pageCSS.editButton}
                  >
                    {isEditing ? "Submit" : "Edit"}
                  </button>
                </div>
                {isEditing ? (
                  <textarea
                    id="description"
                    value={profilePicture}
                    onChange={(event) => setDescription(event.target.value)}
                    style={pageCSS.formTextArea}
                  />
                ) : (
                  <textarea
                    id="description"
                    value={profilePicture}
                    readOnly
                    style={pageCSS.formReadOnly}
                  />
                )}
              </form>
              <form onSubmit={handleSubmit} style={pageCSS.profileForm}>
                <div style={pageCSS.leftDiv}>
                  <label htmlFor="description" style={pageCSS.formLabel}>
                    Display Name
                  </label>
                  <button
                    type="button"
                    onClick={isEditing ? handleSubmit : handleEditClick}
                    style={pageCSS.editButton}
                  >
                    {isEditing ? "Submit" : "Edit"}
                  </button>
                </div>
                {isEditing ? (
                  <textarea
                    id="description"
                    value={displayName}
                    onChange={(event) => setDescription(event.target.value)}
                    style={pageCSS.formTextArea}
                  />
                ) : (
                  <textarea
                    id="description"
                    value={displayName}
                    readOnly
                    style={pageCSS.formReadOnly}
                  />
                )}
              </form>
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
