//old _app.js renamed to RootLayout
import React from "react"
import "../styles/globals.css"
import { Header, SessionProviderWrapper } from "../components"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
//export default function RootLayout({
//    Component,
//    pageProps: { session, ...pageProps },
//}) {
//return (
//    <>
//      <SessionProvider
//        session={session}
//      refetchInterval={30 * 24 * 60 * 60}
//>
//  <Header />
//<Component {...pageProps} />
//</SessionProvider>
//</>
//    )
//}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <SessionProviderWrapper>
                    <Header />
                    {children}
                </SessionProviderWrapper>
            </body>
        </html>
    )
}
