import { addmore } from "lib/config"

export default function LoadLess({ photos, setPhotos, take }) {
    console.log("less photos", photos)
    const lastPhotoCode = photos[photos.length - 1].code
    console.log("lastPhotoCode", lastPhotoCode)

    const firstPhotoCode = photos[0].code
    console.log("firstPhotoCode", firstPhotoCode)

    const prevPhotoCode = firstPhotoCode - addmore
    console.log("prevPhotoCode", prevPhotoCode)
    return (
        <div>
            {lastPhotoCode > 2 && (
                <button
                    className="load-less"
                    onClick={async () => {
                        const backPhotoId = photos[prevPhotoCode].id
                        console.log("firstPhotoId", backPhotoId)

                        const res = await fetch(
                            `/api/photos?${take}&cursor=${backPhotoId}`
                        )

                        photos = await res.json()

                        setPhotos(photos)
                    }}
                >
                    &lt;&lt;&lt;
                </button>
            )}
        </div>
    )
}
