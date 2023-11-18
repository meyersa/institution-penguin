import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, pageProps },
}) {
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee"></link>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
};