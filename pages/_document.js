import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Analytic hook */}
                <script defer data-domain="institutionpenguin.com" src="https://plausible.meyerstk.com/js/script.js"></script>

                {/* Adsense hook */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9341120677101032"
                    crossorigin="anonymous"></script>

                {/* Global font sheets */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee&display=swap"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display&display=swap"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}