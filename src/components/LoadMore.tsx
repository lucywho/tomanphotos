import React from "react"
import { ChevronsRight } from "lucide-react"
import { PhotoProps } from "../lib/types"

interface LoadMoreProps {
    photos: PhotoProps[]
    setPhotos: (photos: PhotoProps[]) => void
    setShowMore: (show: boolean) => void
    setShowLess: (show: boolean) => void
    take: number
}

export const LoadMore = ({
    photos,
    setPhotos,
    setShowMore,
    setShowLess,
    take,
}: LoadMoreProps) => {
    return (
        <div>
            <button
                className="load-more"
                onClick={async () => {
                    const lastPhotoId = photos[photos.length - 1].id

                    const res = await fetch(
                        `/api/photos?take=${take}&cursor=${lastPhotoId}`
                    )

                    if (!res.ok) {
                        throw new Error(
                            `Failed to fetch photos: ${res.statusText}`
                        )
                    }

                    const newPhotos: PhotoProps[] = await res.json()

                    setPhotos(newPhotos)
                    setShowLess(true)

                    if (newPhotos.length < take) {
                        setShowMore(false)
                    }
                }}
            >
                <ChevronsRight color="var(--main-bg-color)" />
            </button>
        </div>
    )
}
