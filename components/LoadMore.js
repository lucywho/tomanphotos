export default function LoadMore({ photos, setPhotos, take }) {
    const lastId = photos[photos.length - 1].code
    console.log("lastID: ", lastId)

    return (
        <div>
            <button
                className="load-more"
                onClick={async () => {
                    const lastPhotoId = photos[photos.length - 1].id

                    const res = await fetch(
                        `/api/photos?${take}&cursor=${lastPhotoId}`
                    )

                    photos = await res.json()

                    setPhotos(photos)
                }}
            >
                &gt;&gt;&gt;
            </button>
        </div>
    )
}
