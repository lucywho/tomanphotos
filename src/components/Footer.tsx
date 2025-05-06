"use client"

import React from "react"
import { ChevronsRight, ChevronsLeft } from "lucide-react"
import { BackOne } from "./BackOne"
import { ForwardOne } from "./ForwardOne"

export function Footer({
    photos,
    onLoadMore,
    onLoadLess,
    photoCode,
}: {
    photos: any[]
    onLoadMore?: () => void
    onLoadLess?: () => void
    photoCode?: number
}) {
    if (typeof photoCode === "number") {
        return (
            <div className="footer">
                <BackOne photoCode={photoCode} />
                <ForwardOne photoCode={photoCode} />
            </div>
        )
    }

    return (
        <div className="footer">
            {onLoadLess && (
                <button className="load-less" onClick={onLoadLess}>
                    <ChevronsLeft color="var(--main-bg-color)" />
                </button>
            )}
            {onLoadMore && (
                <button className="load-more" onClick={onLoadMore}>
                    <ChevronsRight color="var(--main-bg-color)" />
                </button>
            )}
        </div>
    )
}
