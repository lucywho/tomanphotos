import Link from "next/link"
import Image from "next/image"
import prisma from "lib/prisma"
import { getPhoto } from "lib/data"

export default function Photo({ photo }) {
    let link = "https://toman-test.s3.eu-central-1.amazonaws.com/" + photo.url

    return (
        <div className="photo">
            {photo.title ? (
                <p className="title">{photo.title}</p>
            ) : (
                <p className="title holding">no title</p>
            )}
            <img className="singlePhoto" src={link} alt={photo.title} />
            {photo.info ? (
                <p className="info">{photo.info}</p>
            ) : (
                <p className="info holding">no information</p>
            )}
            <Link href="/">home</Link>
        </div>
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
