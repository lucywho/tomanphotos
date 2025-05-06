"use client"

import React, { useState } from "react"
import { Photos } from "./Photos"
import { Footer } from "./Footer"
import { PhotoProps } from "../lib/types"

export function PhotoGalleryClient({
    initialPhotos,
    take,
}: {
    initialPhotos: PhotoProps[]
    take: number
}) {
    const [photos, setPhotos] = useState<PhotoProps[]>(initialPhotos)
    const [showMore, setShowMore] = useState(true)
    const [showLess, setShowLess] = useState(false)

    const [cursorStack, setCursorStack] = useState<string[]>([])

    const handleLoadMore = async () => {
        const lastPhotoId = photos[photos.length - 1].id
        const res = await fetch(
            `/api/photos?take=${take}&cursor=${lastPhotoId}`
        )
        if (!res.ok) throw new Error("Failed to fetch photos")
        const newPhotos: PhotoProps[] = await res.json()
        if (newPhotos.length > 0) {
            setCursorStack([...cursorStack, photos[0].id]) // Save current first photo id for LoadLess
            setPhotos(newPhotos)
            setShowLess(true)
            setShowMore(newPhotos.length === take)
        } else {
            setShowMore(false)
        }
    }

    const handleLoadLess = async () => {
        if (cursorStack.length === 0) return
        const prevCursor = cursorStack[cursorStack.length - 1]
        const res = await fetch(
            `/api/photos?take=-${take}&cursor=${prevCursor}`
        )
        if (!res.ok) throw new Error("Failed to fetch photos")
        const prevPhotos: PhotoProps[] = await res.json()
        setPhotos(prevPhotos)
        setCursorStack(cursorStack.slice(0, -1))
        setShowLess(cursorStack.length > 1)
        setShowMore(true)
    }

    return (
        <>
            <Photos photos={photos} />
            <Footer
                photos={photos}
                onLoadMore={showMore ? handleLoadMore : undefined}
                onLoadLess={showLess ? handleLoadLess : undefined}
            />
        </>
    )
}
