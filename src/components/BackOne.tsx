import React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const BackOne = ({ photoCode }) => {
    const nextPhoto = photoCode - 1

    return (
        <div>
            <Link href={`/photo/${nextPhoto}`}>
                <button className="load-less">
                    <ChevronLeft color="var(--main-bg-color)" />
                </button>
            </Link>
        </div>
    )
}
