export default function LoadMore({
    photos,
    setPhotos,
    setShowMore,
    setShowLess,
    take,
}) {
    return (
        <div>
            <button
                className="load-more"
                onClick={async () => {
                    const lastPhotoId = photos[photos.length - 1].id

                    const res = await fetch(
                        `/api/photos?take=${take}&cursor=${lastPhotoId}`
                    )

                    photos = await res.json()

                    setPhotos(photos)
                    setShowLess(true)

                    if (photos.length < take) {
                        setShowMore(false)
                    }
                }}
            >
                &gt;&gt;&gt;
            </button>
        </div>
    )
}
