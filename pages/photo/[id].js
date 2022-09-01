import { getPhoto } from "lib/data"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import prisma from "lib/prisma"
import Loading from "components/Loading"

export default function Photo({ photo }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [title, setPhotoTitle] = useState("")
    const [info, setPhotoInfo] = useState("")
    const [admin, setAdmin] = useState(false)

    let link

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setAdmin(true)
        }

        if (!photo.title) {
            setPhotoTitle("no title")
        } else {
            setPhotoTitle(photo.title)
        }

        if (!photo.info) {
            setPhotoInfo("no info")
        } else {
            setPhotoInfo(photo.info)
        }
    }, [session, photo.info, photo.title])

    if (loading) {
        return <Loading />
    }

    if (photo != null) {
        link =
            "https://slides-backup-20220722.s3.eu-central-1.amazonaws.com/" +
            photo.url
    } else {
        return
    }

    return (
        <>
            <div className="photo">
                <img className="singlephoto" src={link} alt={photo.title} />

                <div className="singleinfo">
                    {session && admin ? (
                        <form
                            className="title"
                            onSubmit={async (e) => {
                                e.preventDefault()
                                let id = photo.id
                                await fetch("/api/edit", {
                                    body: JSON.stringify({
                                        title,
                                        info,
                                        id,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                })
                            }}
                        >
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    className={
                                        title === "no title"
                                            ? "title holding"
                                            : "title"
                                    }
                                    placeholder={title}
                                    onChange={(e) =>
                                        setPhotoTitle(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="info"
                                    className={
                                        info === "no info"
                                            ? "info holding"
                                            : "info"
                                    }
                                    placeholder={info}
                                    onChange={(e) =>
                                        setPhotoInfo(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                disabled={title ? false : true}
                                className={
                                    title !== "no title"
                                        ? "update-able"
                                        : "update-disabled"
                                }
                            >
                                Update
                            </button>
                        </form>
                    ) : (
                        <>
                            {photo.title ? (
                                <p className="title">{photo.title}</p>
                            ) : (
                                <p className="title holding">no title</p>
                            )}
                            {photo.info ? (
                                <p className="info">{photo.info}</p>
                            ) : (
                                <p className="info holding">no information</p>
                            )}
                        </>
                    )}
                </div>
                <button className="reroute" onClick={() => router.back()}>
                    home
                </button>
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let id = params.id

    let photo = await getPhoto(id, prisma)

    photo = JSON.parse(JSON.stringify(photo))

    return {
        props: {
            photo,
        },
    }
}
