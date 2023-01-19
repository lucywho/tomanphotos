import prisma from "lib/prisma"
import { getPhoto } from "lib/data"
import { useRouter } from "next/router"
import Loading from "components/Loading"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function Photo({ photo }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [title, setPhotoTitle] = useState("")
    const [info, setPhotoInfo] = useState("")
    const [admin, setAdmin] = useState(false)
    const [showForm, setShowForm] = useState(false)

    let link

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setAdmin(true)
        }

        photo.title ? setPhotoTitle(photo.title) : setPhotoTitle("no title")

        photo.info ? setPhotoInfo(photo.info) : setPhotoInfo("no info")
    }, [session, photo.info, photo.title])

    if (loading) {
        return <Loading />
    }

    if (photo != null) {
        link = `https://slides-backup-20220722.s3.eu-central-1.amazonaws.com/${photo.url}`
    } else {
        return
    }

    return (
        <>
            <div className="photo">
                <div className="single-info">
                    {showForm ? (
                        <form
                            className="title"
                            onSubmit={async (e) => {
                                e.preventDefault()
                                let code = photo.code
                                await fetch("/api/edit", {
                                    body: JSON.stringify({
                                        title,
                                        info,
                                        code,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                })

                                setShowForm(false)
                                router.reload()
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
                            <img
                                className="single-photo"
                                src={link}
                                alt={photo.title}
                            />

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
                            <div className="single-photo-title">
                                {photo.title ? (
                                    <p className="title">{photo.title}</p>
                                ) : (
                                    <p className="title holding">no title</p>
                                )}
                            </div>
                            <img
                                className="single-photo"
                                src={link}
                                alt={photo.title}
                            />

                            {photo.info ? (
                                <p className="info">{photo.info}</p>
                            ) : (
                                <p className="info holding">no information</p>
                            )}
                        </>
                    )}
                    {admin && (
                        <>
                            {showForm ? (
                                <button
                                    className="edit"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    className="edit"
                                    onClick={() => setShowForm(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

//===================================================================

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
