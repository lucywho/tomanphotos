import { addmore } from "lib/config"

export default function LoadLess({ photos, setPhotos, take }) {
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
                }}
            >
                &lt;&lt;&lt;
            </button>
        </div>
    )
}
