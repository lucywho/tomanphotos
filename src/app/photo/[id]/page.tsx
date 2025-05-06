import prisma from "../../../lib/prisma"
import { getPhoto } from "../../../lib/data"
import { SessionUser } from "../../../lib/types"
import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { EditFormSection } from "./editFormSection"
import { Footer } from "../../../components"
import React, { Suspense } from "react"

export default async function PhotoPage({
    params,
}: {
    params: { id: string }
}) {
    const prms = await params
    const photo = await getPhoto(prms.id, prisma)
    const session: Session | null = await getServerSession(authOptions)
    const user = session?.user as SessionUser
    const isAdmin = !!user?.isAdmin
    const link = `${process.env.BACKUP_LINK}${photo.url}`

    // Helper to get dateInfo
    let dateInfo = photo.date || photo.year || photo.decade || ""

    return (
        <div id="content">
            <div className="single-photo-container">
                <div>
                    {photo.title ? (
                        <p className="title">{photo.title}</p>
                    ) : (
                        <p className="title holding">no title</p>
                    )}
                </div>
                <img className="single-photo" src={link} alt={photo.title} />
                {photo.info ? (
                    <p className="info">{photo.info}</p>
                ) : (
                    <p className="info holding">no information</p>
                )}
                {dateInfo && <p className="info">Date: {dateInfo}</p>}
                {isAdmin && <EditFormSection photo={photo} />}
            </div>
            <Footer photos={photo ? [photo] : []} photoCode={photo.code} />
        </div>
    )
}
