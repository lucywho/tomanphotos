import Link from "next/link"
import prisma from "lib/prisma"
import { getPhoto } from "lib/data"

export default function Photo({ photo }) {
    let link

    if (photo != null) {
        link = "https://toman-test.s3.eu-central-1.amazonaws.com/" + photo.url
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
                    <Link href="/">
                        <div className="reroute">home</div>
                    </Link>
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
