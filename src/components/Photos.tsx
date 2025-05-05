import React from "react"
import { Photo } from "./Photo"

export const Photos = ({ photos }) => {
    if (!photos) return null

    return (
        <>
            {photos.map((photo, index) => (
                <Photo key={index} photo={photo} />
            ))}
        </>
    )
}
