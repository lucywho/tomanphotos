import prisma from "lib/prisma"
import { useState } from "react"
import { getPhotos } from "lib/data"
import { useSession } from "next-auth/react"

import Photos from "components/Photos"
import Loading from "components/Loading"
import LoadMore from "components/LoadMore"

export default function Home({ initialPhotos }) {
    const { data: session, status } = useSession()
    const [photos, setPhotos] = useState(initialPhotos)
    const loading = status === "loading"

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="contentbox">
                <Photos photos={photos} />
            </div>
            <LoadMore photos={photos} setPhotos={setPhotos} />
        </>
    )
}

export async function getServerSideProps() {
    const take = 20
    let photos = await getPhotos(prisma, take)
    photos = JSON.parse(JSON.stringify(photos))

    return {
        props: {
            initialPhotos: photos,
        },
    }
}
