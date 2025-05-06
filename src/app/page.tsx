import prisma from "../lib/prisma"
import { getPhotos } from "../lib/data"
import { addmore } from "../lib/config"
import { PhotoGalleryClient } from "../components/PhotoGalleryClient"

export default async function Home() {
    const initialPhotos = await getPhotos(prisma, addmore)
    return (
        <main id="content">
            <PhotoGalleryClient initialPhotos={initialPhotos} take={addmore} />
        </main>
    )
}
