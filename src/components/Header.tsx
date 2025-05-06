"use client"
import React from "react"
import Link from "next/link"
import { SessionUser } from "../lib/types"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export const Header = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const user = session?.user as SessionUser

    let admin = false

    if (user?.isAdmin) {
        admin = true
    }

    return (
        <>
            <div id="header">
                <title>Family Photos</title>
                <meta name="description" content="family photo site" />
                <link rel="icon" type="image/x-icon" href="/image/camera.ico" />
                <div id="strapline">Our Family Photos</div>
                <div id="login">
                    {pathname === "/" && (
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
                    {pathname !== "/" && (
                        <>
                            {/* ToDo: set to return to previous gallery page, not home */}
                            <button
                                className="reroute"
                                onClick={() => router.push("/")}
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
