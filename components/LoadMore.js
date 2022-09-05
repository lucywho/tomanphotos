export default function LoadMore({ photos, setPhotos, take }) {
    // const lastCode = photos[photos.length - 1].code

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
                }}
            >
                &gt;&gt;&gt;
            </button>
        </div>
    )
}
