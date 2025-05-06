import React from "react"
import { ChevronsLeft } from "lucide-react"
import { addmore } from "../lib/config"
import { PhotoProps } from "../lib/types"

interface LoadLessProps {
    photos: PhotoProps[]
    setPhotos: (photos: PhotoProps[]) => void
    setShowMore: (show: boolean) => void
    setShowLess: (show: boolean) => void
    take: number
}

export const LoadLess = ({
    photos,
    setPhotos,
    setShowLess,
    setShowMore,
    take,
}: LoadLessProps) => {
    take = 0 - take

    return (
        <div>
            <button
                className="load-less"
                onClick={async () => {
                    const backPhotoId = photos[0].id

                    const res = await fetch(
                        `/api/photos?take=${take}&cursor=${backPhotoId}`
                    )

                    if (!res.ok) {
                        throw new Error(
                            `Failed to fetch photos: ${res.statusText}`
                        )
                    }

                    photos = await res.json()

                    setPhotos(photos)

                    setShowMore(true)

                    if (photos.length < take || photos[0].code == 1) {
                        setShowLess(false)
                    }
                }}
            >
                <ChevronsLeft color="var(--main-bg-color)" />
            </button>
        </div>
    )
}
