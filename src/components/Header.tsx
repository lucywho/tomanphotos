"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { SessionUser, PhotoProps } from "../lib/types"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export const Header = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    let pathname = usePathname()
    const user = session?.user as SessionUser
    const [photoId, setPhotoId] = useState<string | null>(null)

    let admin = false

    if (user?.isAdmin) {
        admin = true
    }

    const getPhotoCodeFromPath = (path: string): string | undefined => {
        const match = path.match(/^\/photo\/(.+)$/)
        return match ? match[1] : undefined
    }

    useEffect(() => {
        const fetchPhotoId = async () => {
            const code = pathname ? getPhotoCodeFromPath(pathname) : undefined
            if (code) {
                try {
                    const response = await fetch(
                        `/api/photo-by-code?code=${code}`
                    )
                    if (response.ok) {
                        const data = await response.json()
                        setPhotoId(data.id)
                    } else {
                        console.error("Failed to fetch photo ID")
                    }
                } catch (error) {
                    console.error("Error fetching photo ID:", error)
                }
            }
        }

        fetchPhotoId()
    }, [pathname])

    const handleHomeClick = () => {
        if (photoId) {
            router.push(`/?id=${photoId}`)
            setTimeout(() => {
                window.history.replaceState({}, "", "/")
            }, 1000)
        } else {
            router.push("/")
        }
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
                            <button
                                className="reroute"
                                onClick={handleHomeClick}
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
