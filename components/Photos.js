import Photo from "./Photo"

export default function Photos({ photos }) {
    if (!photos) return null

    return (
        <>
            {photos.map((photo, index) => (
                <Photo key={index} photo={photo} />
            ))}
        </>
    )
}
