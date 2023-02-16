import Link from "next/link"

export default function ForwardOne({ photoCode }) {
    const nextPhoto = photoCode + 1

    return (
        <div>
            <Link href={`/photo/${nextPhoto}`}>
                <button className="load-more">&gt;</button>
            </Link>
        </div>
    )
}
