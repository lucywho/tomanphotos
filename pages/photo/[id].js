import Link from "next/link"
import prisma from "lib/prisma"
import { getPhoto } from "lib/data"
import { useRouter } from "next/router"

export default function Photo({ photo }) {
    const router = useRouter()
    let link

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

                    <button className="reroute" onClick={() => router.back()}>
                        home
                    </button>
                </div>
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
