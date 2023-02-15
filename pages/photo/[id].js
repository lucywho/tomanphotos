import prisma from "lib/prisma"
import { getPhoto } from "lib/data"
import { useRouter } from "next/router"
import Loading from "components/Loading"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Footer from "components/Footer"

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
            <div id="content">
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
                                <textarea
                                    type="text"
                                    name="info"
                                    className={
                                        info === "no info"
                                            ? "info holding"
                                            : "info"
                                    }
                                    placeholder={
                                        info === "no info"
                                            ? "type a description here"
                                            : info
                                    }
                                    onChange={(e) =>
                                        setPhotoInfo(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="decades">Select a decade</label>
                                <select
                                    name="decade"
                                    id="decade"
                                    className="info"
                                    onChange={(e) =>
                                        setPhotoDecade(e.target.value)
                                    }
                                >
                                    <option label=" "></option>
                                    <option value="1950-59">1950s</option>
                                    <option value="1960-69">1960s</option>
                                    <option value="1970-79">1970s</option>
                                    <option value="1980-89">1980s</option>
                                    <option value="1990-99">1990s</option>
                                    <option value="2000-09">2000s</option>
                                    <option value="2010-19">2010s</option>
                                    <option value="2020-29">2020s</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="year"
                                    className="info"
                                    placeholder={
                                        year ? year : "type a year e.g. 1973"
                                    }
                                    onChange={(e) =>
                                        setPhotoYear(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    name="date"
                                    className="info"
                                    placeholder={date ? date : "date"}
                                    onChange={(e) =>
                                        setPhotoDate(e.target.value)
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
                </div>
            </div>
            <Footer
                photos={photo}
                showForm={showForm}
                setShowForm={setShowForm}
            />
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
