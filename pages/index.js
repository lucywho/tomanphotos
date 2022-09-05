import prisma from "lib/prisma"
import { useEffect, useState } from "react"
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
    const [less, setLess] = useState(true)

    let admin

    useEffect(() => {
        if (photos[0].code === 1) {
            setLess(false)
        }
    }, [])

    if (session) {
        admin = session.user.isAdmin
    }
    if (loading) {
        return <Loading />
    }

    return (
        <div id="content">
            {session && (
                <div className="admin-notice">
                    {admin ? "" : "Please contact Lucy to get admin rights"}
                </div>
            )}
            <div className="photo-box">
                <Photos photos={photos} />
            </div>
            <footer className="footer">
                <LoadLess
                    photos={photos}
                    setPhotos={setPhotos}
                    take={addmore}
                />

                <LoadMore
                    photos={photos}
                    setPhotos={setPhotos}
                    take={addmore}
                />
            </footer>
        </div>
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
