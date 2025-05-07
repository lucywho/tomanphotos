import React from "react"
import { ChevronsRight } from "lucide-react"

interface LoadMoreProps {
    onClick?: () => void
}

export const LoadMore = ({ onClick }: LoadMoreProps) => {
    return (
        <div>
            <button className="load-more" onClick={onClick}>
                <ChevronsRight color="var(--main-bg-color)" />
            </button>
        </div>
    )
}
