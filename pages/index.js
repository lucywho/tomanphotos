import prisma from "lib/prisma"
import Photos from "components/Photos"
import { getPhotos } from "lib/data"

export default function Home({ photos }) {
    return (
        <>
            <div className="contentbox">
                <Photos photos={photos} />
            </div>
        </>
    )
}

export async function getServerSideProps() {
    let photos = await getPhotos(prisma)
    photos = JSON.parse(JSON.stringify(photos))

    return {
        props: {
            photos: photos,
        },
    }
}
