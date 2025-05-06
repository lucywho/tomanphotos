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
                <div className="footer-section-left">
                    <BackOne photoCode={photoCode} />
                </div>
                <div className="footer-section-center" />
                <div className="footer-section-right">
                    <ForwardOne photoCode={photoCode} />
                </div>
            </div>
        )
    }

    return (
        <div className="footer">
            <div className="footer-section-left">
                {onLoadLess ? (
                    <button className="load-less" onClick={onLoadLess}>
                        <ChevronsLeft color="var(--main-bg-color)" />
                    </button>
                ) : (
                    <div className="footer-spacer" />
                )}
            </div>
            <div className="footer-section-center" />
            <div className="footer-section-right">
                {onLoadMore ? (
                    <button className="load-more" onClick={onLoadMore}>
                        <ChevronsRight color="var(--main-bg-color)" />
                    </button>
                ) : (
                    <div className="footer-spacer" />
                )}
            </div>
        </div>
    )
}
