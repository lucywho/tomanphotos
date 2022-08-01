import prisma from "lib/prisma"
import { useState } from "react"
import { getPhotos } from "lib/data"
import Photos from "components/Photos"
import LoadMore from "components/LoadMore"

export default function Home({ initialPhotos }) {
    const [photos, setPhotos] = useState(initialPhotos)

    console.log("photos Home: ", initialPhotos)

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
    console.log("photos SSP: ", photos)

    return {
        props: {
            initialPhotos: photos,
        },
    }
}
