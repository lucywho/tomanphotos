import Link from "next/link"

export default function BackOne({ photoCode }) {
    const nextPhoto = photoCode - 1

    return (
        <div>
            <Link href={`/photo/${nextPhoto}`}>
                <button className="load-less">&lt;</button>
            </Link>
        </div>
    )
}
