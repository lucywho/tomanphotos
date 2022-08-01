export default function LoadMore({ photos, setPhotos, take }) {
    return (
        <div className="">
            <button
                className="load-more"
                onClick={async () => {
                    const lastPhotoId = photos[photos.length - 1].id

                    const res = await fetch(
                        `/api/photos?${take}&cursor=${lastPhotoId}`
                    )
                    const data = await res.json()

                    setPhotos([...photos, ...data])
                }}
            >
                Load more . . .
            </button>
        </div>
    )
}
