import prisma from "../lib/prisma"
import React from "react"
import { getPhotos } from "../lib/data"
import { addmore } from "../lib/config"
import { SessionUser } from "../lib/types"
import type { Session } from "next-auth"
import { getServerSession } from "next-auth"
import authOptions from "../../pages/api/auth/[...nextauth]"

import { Photos, Loading, Footer } from "../components"

export default async function Home() {
    const session: Session | null = await getServerSession(authOptions)
    const user = session?.user as SessionUser
    const photos = await getPhotos(prisma, addmore)

    //const [photos, setPhotos] = useState(photoSet)

    let admin = false

    if (session) {
        if (user?.isAdmin) {
            admin = true
        }
    }

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
