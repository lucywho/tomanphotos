import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useState } from "react"
import LoadLess from "./LoadLess"
import LoadMore from "./LoadMore"
import { addmore } from "lib/config"

export default function Footer({ photos, setPhotos, showForm, setShowForm }) {
    const { data: session, status } = useSession()
    const [showLess, setShowLess] = useState(false)
    const [showMore, setShowMore] = useState(true)
    const router = useRouter()
    let admin = false

    if (session && session.user.isAdmin) {
        admin = true
    }

    return (
        <>
            <div className="footer">
                <>
                    {router.asPath === "/" && (
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

                    {router.asPath !== "/" && (
                        <>
                            <button>back one here</button>
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
                            <button>forward one here</button>
                        </>
                    )}
                </>
            </div>
        </>
    )
}
