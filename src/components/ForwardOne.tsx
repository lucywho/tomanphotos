import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const ForwardOne = ({ photoCode }) => {
    const nextPhoto = photoCode + 1

    return (
        <div>
            <Link href={`/photo/${nextPhoto}`}>
                <button className="load-more">
                    <ChevronRight color="var(--main-bg-color)" />
                </button>
            </Link>
        </div>
    )
}
