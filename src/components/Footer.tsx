"use client"

import React from "react"
import { LoadMore, LoadLess, ForwardOne, BackOne } from "./index"

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
                    <LoadLess onClick={onLoadLess} />
                ) : (
                    <div className="footer-spacer" />
                )}
            </div>
            <div className="footer-section-center" />
            <div className="footer-section-right">
                {onLoadMore ? (
                    <LoadMore onClick={onLoadMore} />
                ) : (
                    <div className="footer-spacer" />
                )}
            </div>
        </div>
    )
}
