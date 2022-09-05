import { addmore } from "lib/config"

export default function LoadLess({
    photos,
    setPhotos,
    setShowLess,
    setShowMore,
    take,
}) {
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

                    photos = await res.json()

                    setPhotos(photos)

                    setShowMore(true)

                    if (photos.length < take || photos[0].code == 1) {
                        setShowLess(false)
                    }
                }}
            >
                &lt;&lt;&lt;
            </button>
        </div>
    )
}
