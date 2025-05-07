"use client"

import React, { useState, useEffect } from "react"
import { Photos } from "./Photos"
import { Footer } from "./Footer"
import { PhotoProps } from "../lib/types"
import { useSearchParams } from "next/navigation"

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
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleNavigationWithId = async () => {
            if (!searchParams) return

            const id = searchParams.get("id")
            console.log("id", id)

            if (
                id &&
                initialPhotos.length > 0 &&
                String(initialPhotos[0].id) !== id
            ) {
                try {
                    // Use -take to get photos BEFORE the current photo, and include=true to include the current photo
                    const res = await fetch(
                        `/api/photos?take=-${take}&cursor=${id}&include=true`
                    )

                    if (!res.ok) {
                        throw new Error(
                            `Failed to fetch photos: ${res.statusText}`
                        )
                    }

                    const data: PhotoProps[] = await res.json()

                    if (data && data.length > 0) {
                        setPhotos(data)

                        // Enable LoadLess if we're not at the beginning
                        // We need to check if there are photos before this set
                        if (data.length === take) {
                            // We can assume there are more photos earlier,
                            // so we add to the cursorStack to enable LoadLess
                            setCursorStack((prev) => {
                                // Only add if the stack is empty or different from current
                                if (
                                    prev.length === 0 ||
                                    prev[prev.length - 1] !== data[0].id
                                ) {
                                    return [...prev, data[0].id]
                                }
                                return prev
                            })
                            setShowLess(true)
                        }
                    }
                } catch (error) {
                    // fallback: do nothing, keep initialPhotos
                    console.error("Error fetching photos with ID:", error)
                }
            }
        }

        handleNavigationWithId()
    }, [searchParams, initialPhotos, take])

    const handleLoadMore = async () => {
        const cursor = photos[photos.length - 1].id

        try {
            const res = await fetch(`/api/photos?take=${take}&cursor=${cursor}`)

            if (!res.ok) {
                throw new Error(`Failed to fetch photos: ${res.statusText}`)
            }

            const newPhotos: PhotoProps[] = await res.json()

            if (newPhotos.length > 0) {
                setCursorStack([...cursorStack, photos[0].id])
                setPhotos(newPhotos)
                setShowLess(true)
                setShowMore(newPhotos.length === take)
            } else {
                setShowMore(false)
            }
        } catch (error) {
            console.error("Error loading more photos:", error)
        }
    }

    const handleLoadLess = async () => {
        const cursor = photos[0].id

        try {
            const res = await fetch(
                `/api/photos?take=-${take}&cursor=${cursor}`
            )

            if (!res.ok) {
                throw new Error(`Failed to fetch photos: ${res.statusText}`)
            }

            const prevPhotos: PhotoProps[] = await res.json()
            setPhotos(prevPhotos)
            setCursorStack(cursorStack.slice(0, -1))
            setShowLess(cursorStack.length > 1)
            setShowMore(true)
        } catch (error) {
            console.error("Error loading previous photos:", error)
        }
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
