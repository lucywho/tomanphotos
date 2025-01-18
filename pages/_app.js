import "../styles/globals.css"
import Header from "components/Header"
import { SessionProvider } from "next-auth/react"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <SessionProvider
                session={session}
                refetchInterval={30 * 24 * 60 * 60}
            >
                <Header />
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}
