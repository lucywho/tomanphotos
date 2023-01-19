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
    const [decade, setPhotoDecade] = useState("")
    const [year, setPhotoYear] = useState("")
    const [date, setPhotoDate] = useState("")
    const [dateInfo, setDateInfo] = useState("")
    const [admin, setAdmin] = useState(false)
    const [showForm, setShowForm] = useState(false)

    let link

    useEffect(() => {
        if (session && session.user.isAdmin) {
            setAdmin(true)
        }

        function findDateInfo() {
            if (photo.date) {
                setDateInfo(photo.date)
            } else if (photo.year) {
                setDateInfo(photo.year)
            } else if (photo.decade) {
                setDateInfo(photo.decade)
            }
        }

        photo.title ? setPhotoTitle(photo.title) : setPhotoTitle("no title")

        photo.info ? setPhotoInfo(photo.info) : setPhotoInfo("no info")

        findDateInfo()
    }, [session, photo])

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
            <div className="single-photo-container">
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
                                    decade,
                                    year,
                                    date,
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
                                placeholder={
                                    title === "no title"
                                        ? "give this photo a title"
                                        : title
                                }
                                onChange={(e) => setPhotoTitle(e.target.value)}
                            />
                        </div>
                        <img
                            className="single-photo"
                            src={link}
                            alt={photo.title}
                        />

                        <div>
                            <textarea
                                type="text"
                                name="info"
                                className={
                                    info === "no info" ? "info holding" : "info"
                                }
                                placeholder={
                                    info === "no info"
                                        ? "type a description here"
                                        : info
                                }
                                onChange={(e) => setPhotoInfo(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="decade"
                                className="info"
                                placeholder={
                                    decade ? decade : "type a decade e.g. 1970s"
                                }
                                onChange={(e) => setPhotoDecade(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="year"
                                className="info"
                                placeholder={
                                    year ? year : "type a year e.g. 1973"
                                }
                                onChange={(e) => setPhotoYear(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                name="date"
                                className="info"
                                placeholder={date ? date : "date"}
                                onChange={(e) => setPhotoDate(e.target.value)}
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
                        <div>
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

                        {dateInfo ? (
                            <p className="info">Date: {dateInfo}</p>
                        ) : (
                            <></>
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
