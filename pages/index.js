import prisma from "lib/prisma"
import { useState } from "react"
import { getPhotos } from "lib/data"
import { useSession } from "next-auth/react"
import { addmore } from "lib/config"

import Photos from "components/Photos"
import Loading from "components/Loading"
import Footer from "components/Footer"

export default function Home({ photoSet }) {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [photos, setPhotos] = useState(photoSet)
  
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
            <Footer photos={photos} setPhotos={setPhotos} />
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
