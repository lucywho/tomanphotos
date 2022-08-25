import Head from "next/head"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status } = useSession()
    return (
        <>
            <Head>
                <title>Family Photos</title>
                <meta name="description" content="family photo site" />
                <link rel="icon" href="camera.ico" />
            </Head>
            <div id="header">
                <div id="strapline">Our Family Photos</div>
                <div id="login">
                    <Link
                        href={
                            session ? "/api/auth/signout" : "/api/auth/signin"
                        }
                    >
                        {session ? (
                            <button className="sign-in">sign out</button>
                        ) : (
                            <button className="sign-in">sign in</button>
                        )}
                    </Link>
                </div>
            </div>
        </>
    )
}
