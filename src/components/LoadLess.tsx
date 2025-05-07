import React from "react"
import { ChevronsLeft } from "lucide-react"

interface LoadLessProps {
    onClick?: () => void
}

export const LoadLess = ({ onClick }: LoadLessProps) => {
    return (
        <div>
            <button className="load-less" onClick={onClick}>
                <ChevronsLeft color="var(--main-bg-color)" />
            </button>
        </div>
    )
}
