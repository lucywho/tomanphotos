"use client"

import { addmore } from "../lib/config"
import React, { useState } from "react"
import { SessionUser, FooterProps } from "../lib/types"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { BackOne, LoadLess, LoadMore, ForwardOne } from "./index"

export const Footer = ({
    photos,
    setPhotos,
    showForm,
    setShowForm,
}: FooterProps) => {
    const { data: session, status } = useSession()
    const [showLess, setShowLess] = useState(false)
    const [showMore, setShowMore] = useState(true)
    const pathname = usePathname()
    const user = session?.user as SessionUser
    // Extract photoCode from pathname if not on root
    let photoCode = null
    if (pathname !== "/") {
        const parts = pathname.split("/")
        if (parts.length > 2 && parts[2]) {
            photoCode = parseInt(parts[2])
        }
    }

    let admin = false

    if (user?.isAdmin) {
        admin = true
    }

    return (
        <div className="footer">
            <>
                {pathname === "/" && (
                    <>
                        {showLess ? (
                            <LoadLess
                                photos={photos}
                                setPhotos={setPhotos}
                                setShowLess={setShowLess}
                                setShowMore={setShowMore}
                                take={addmore}
                            />
                        ) : (
                            <button className="filler"></button>
                        )}
                        {showMore ? (
                            <LoadMore
                                photos={photos}
                                setPhotos={setPhotos}
                                setShowMore={setShowMore}
                                setShowLess={setShowLess}
                                take={addmore}
                            />
                        ) : (
                            <button className="filler"></button>
                        )}
                    </>
                )}

                {pathname !== "/" && photoCode && (
                    <>
                        {photoCode > 1 ? (
                            <BackOne photoCode={photoCode} />
                        ) : (
                            <button className="filler"></button>
                        )}
                        {admin && (
                            <>
                                {showForm ? (
                                    <button
                                        className="edit"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        className="edit"
                                        onClick={() => setShowForm(true)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </>
                        )}
                        {/* TODO calculate last item and render component conditionally */}
                        <ForwardOne photoCode={photoCode} />
                    </>
                )}
            </>
        </div>
    )
}
