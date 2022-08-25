import Head from "next/head"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status } = useSession()
    return (
        <>
            <Head>
                <title>Toman Photos</title>
                <meta name="description" content="family photo site" />
                <link rel="icon" href="camera.ico" />
            </Head>
            <div id="header">
                <div id="strapline">Toman Family Photos</div>
                <div id="login">
                    <Link
                        href={
                            session ? "/api/auth/signout" : "/api/auth/signin"
                        }
                    >
                        {session ? (
                            <button className="login">sign out</button>
                        ) : (
                            <button className="login">sign in</button>
                        )}
                    </Link>
                </div>
            </div>
        </>
    )
}
