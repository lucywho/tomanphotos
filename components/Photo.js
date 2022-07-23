export default function Photo({ photo }) {
    return (
        <div className="contentbox">
            {photo.title && <p className="title">{photo.title}</p>}

            {photo.url && <img className="photo" src={photo.url} alt="" />}

            {photo.info && <p className="info">{photo.info}</p>}
        </div>
    )
}
