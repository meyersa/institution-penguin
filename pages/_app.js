import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps,
}) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
};