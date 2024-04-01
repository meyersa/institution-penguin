import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Analytic hook */}
                <script defer data-domain="institutionpenguin.com" src="https://plausible.meyerstk.com/js/script.js"></script>

                {/* Global font sheets */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee&display=optional"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display&display=optional"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}