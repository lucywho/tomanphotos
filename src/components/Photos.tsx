import React from "react"
import { Photo } from "./Photo"
import { PhotoProps } from "../lib/types"
export const Photos = ({ photos }: { photos: PhotoProps[] }) => {
    if (!photos) return null

    return (
        <div className="photo-box">
            {photos.map((photo, index) => (
                <Photo key={index} photo={photo} />
            ))}
        </div>
    )
}
