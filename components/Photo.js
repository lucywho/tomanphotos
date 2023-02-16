import Link from "next/link"
import Image from "next/image"

export default function Photo({ photo }) {
    const link = `https://slides-backup-20220722.s3.eu-central-1.amazonaws.com/${photo.url}`
    const size = `330`

    return (
        <div className="thumbnail-container">
            <Link href={`/photo/${photo.code}`}>
                <a>
                    {photo.url && (
                        <Image
                            className="thumbnail"
                            alt={photo.title}
                            src={link}
                            height={size}
                            width={size}
                            objectFit="cover"
                        />
                    )}
                </a>
            </Link>
        </div>
    )
}
