import React from "react"
import prisma from "../../lib/prisma"
import { getPhotos } from "../../lib/data"
import { addmore } from "../../lib/config"
import { Photos, Footer } from "../../components"

export default async function PhotoGalleryPage() {
    const photos = await getPhotos(prisma, addmore)

    return (
        <>
            <main id="content">
                <div className="photo-box">
                    <Photos photos={photos} />
                </div>
            </main>
            <Footer photos={photos} />
        </>
    )
}
