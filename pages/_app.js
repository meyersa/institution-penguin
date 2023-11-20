import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div> 
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee"></link>
      <Component {...pageProps} />
    </div>
  )
};