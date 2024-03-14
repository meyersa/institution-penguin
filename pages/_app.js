import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, pageProps },
}) {
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee"></link>
      <script defer data-domain="institutionpenguin.com" src="https://plausible.meyerstk.com/js/script.js"></script>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
};