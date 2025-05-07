import React from "react"
import Link from "next/link"
import Image from "next/image"
import { PhotoProps } from "../lib/types"

export const Photo = ({ photo }: { photo: PhotoProps }) => {
    const link = `${process.env.NEXT_PUBLIC_BACKUP_LINK}${photo.url}`
    const id = photo.id

    return (
        <div className="thumbnail-container">
            <Link href={`/photo/${photo.code}`}>
                <>
                    {photo.url && (
                        <Image
                            className="thumbnail"
                            alt={photo.title ? photo.title : "untitled photo"}
                            src={link}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    )}
                </>
            </Link>
        </div>
    )
}
