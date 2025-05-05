import prisma from "../../../lib/prisma"
import { getPhoto } from "../../../lib/data"
import { SessionUser } from "../../../lib/types"
import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import authOptions from "../../../../pages/api/auth/[...nextauth]"
import { Form } from "../../../components/Form"
import { Footer } from "../../../components"
import React, { Suspense } from "react"

export default async function PhotoPage({
    params,
}: {
    params: { id: string }
}) {
    const photo = await getPhoto(params.id, prisma)
    const session: Session | null = await getServerSession(authOptions)
    const user = session?.user as SessionUser
    const isAdmin = !!user?.isAdmin
    const link = `https://slides-backup-20220722.s3.eu-central-1.amazonaws.com/${photo.url}`

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
            <Footer photos={photo ? [photo] : []} />
        </div>
    )
}

function EditFormSection({ photo }: { photo: any }) {
    const [showForm, setShowForm] = React.useState(false)
    if (!showForm) {
        return (
            <button className="edit" onClick={() => setShowForm(true)}>
                Edit this information
            </button>
        )
    }
    return (
        <Form
            photo={photo}
            initialTitle={photo.title || "no title"}
            initialInfo={photo.info || "no info"}
            initialDecade={photo.decade || ""}
            initialYear={photo.year || ""}
            initialDate={photo.date || ""}
            onSave={() => setShowForm(false)}
        />
    )
}
