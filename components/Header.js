import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status } = useSession()
    const router = useRouter()
    let admin = false

    if (session && session.user.isAdmin) {
        admin = true
    }

    return (
        <>
            <Head>
                <title>Family Photos</title>
                <meta name="description" content="family photo site" />
                <link rel="icon" type="image/x-icon" href="/image/camera.ico" />
            </Head>
            <div id="header">
                <div id="strapline">Our Family Photos</div>
                <div id="login">
                    {router.asPath === "/" && (
                        <Link
                            href={
                                session
                                    ? "/api/auth/signout"
                                    : "/api/auth/signin"
                            }
                        >
                            {session ? (
                                <button className="sign-out">
                                    <span className="sign-text">sign out</span>
                                    <span className="sign-out-icon">🙎</span>
                                </button>
                            ) : (
                                <button className="sign-in">
                                    <span className="sign-text">sign in</span>
                                    <span className="sign-in-icon">🙎</span>
                                </button>
                            )}
                        </Link>
                    )}
                    {router.asPath !== "/" && (
                        <>
                            {/* ToDo: set to return to previous page, not home */}
                            <button
                                className="reroute"
                                onClick={() => router.back()}
                            >
                                home
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
