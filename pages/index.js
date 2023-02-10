import prisma from "lib/prisma"
import { useState } from "react"
import { getPhotos } from "lib/data"
import { useSession } from "next-auth/react"
import { addmore } from "lib/config"

import Photos from "components/Photos"
import Loading from "components/Loading"
import LoadMore from "components/LoadMore"
import LoadLess from "components/LoadLess"

export default function Home({ photoSet }) {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [photos, setPhotos] = useState(photoSet)
    const [showLess, setShowLess] = useState(false)
    const [showMore, setShowMore] = useState(true)

    let admin

    if (session) {
        admin = session.user.isAdmin
    }
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div id="content">
                <div className="photo-box">
                    <Photos photos={photos} />
                </div>
            </div>
            <footer className="footer">
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
            </footer>
        </>
    )
}

export async function getServerSideProps() {
    const take = addmore
    let photos = await getPhotos(prisma, take)

    try {
        photos = JSON.parse(JSON.stringify(photos))
    } catch (err) {
        console.log("Error: ", err.message)
    }

    return {
        props: {
            photoSet: photos,
        },
    }
}
