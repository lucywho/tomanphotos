import Link from "next/link"
import Image from "next/image"

export default function Photo({ photo }) {
    const link = "https://toman-test.s3.eu-central-1.amazonaws.com/" + photo.url

    return (
        <div className="photobox">
            <Link href={`/photo/${photo.id}`}>
                <>
                    <p>{photo.id}</p>
                    {photo.title ? (
                        <p className="title">{photo.title}</p>
                    ) : (
                        <p className="title holding">no title</p>
                    )}

                    {photo.url && (
                        <Image
                            className="thumbnail"
                            alt="thumbnail"
                            src={link}
                            height="200"
                            width="200"
                        />
                    )}

                    {photo.info ? (
                        <p className="info">{photo.info}</p>
                    ) : (
                        <p className="info holding">no information</p>
                    )}
                </>
            </Link>
        </div>
    )
}
