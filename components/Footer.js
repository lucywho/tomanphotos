import { useState } from "react"
import { addmore } from "lib/config"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import BackOne from "./BackOne"
import LoadLess from "./LoadLess"
import LoadMore from "./LoadMore"
import ForwardOne from "./ForwardOne"

export default function Footer({ photos, setPhotos, showForm, setShowForm }) {
    const { data: session, status } = useSession()
    const [showLess, setShowLess] = useState(false)
    const [showMore, setShowMore] = useState(true)
    const router = useRouter()
    const photoCode = parseInt(router.asPath.split("/")[2])

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
        </>
    )
}
