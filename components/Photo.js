export default function Photo({ photo }) {
    return (
        <div className="photobox">
            {photo.title ? (
                <p className="title">{photo.title}</p>
            ) : (
                <p className="title holding">no title</p>
            )}

            {photo.url && <img className="photo" src={photo.url} alt="" />}

            {photo.info ? (
                <p className="info">{photo.info}</p>
            ) : (
                <p className="info holding">no information</p>
            )}
        </div>
    )
}
