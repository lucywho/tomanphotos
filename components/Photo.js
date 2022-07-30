import Link from "next/link"
import Image from "next/image"

export default function Photo({ photo }) {
    const link = "https://toman-test.s3.eu-central-1.amazonaws.com/" + photo.url

    return (
        <div className="thumbnail-container">
            <Link href={`/photo/${photo.id}`}>
                <a>
                    {photo.title ? (
                        <p className="title">{photo.title}</p>
                    ) : (
                        <p className="title holding">no title</p>
                    )}

                    {photo.url && (
                        <Image
                            className="thumbnail"
                            alt={photo.title}
                            src={link}
                            height={220}
                            width={220}
                            objectFit="cover"
                        />
                    )}
                </a>
            </Link>
        </div>
    )
}
