"use client"

import React, { useState } from "react"

interface FormProps {
    photo: any
    initialTitle: string
    initialInfo: string
    initialDecade: string
    initialYear: string
    initialDate: string
    onSave: () => void
}

export function Form({
    photo,
    initialTitle,
    initialInfo,
    initialDecade,
    initialYear,
    initialDate,
    onSave,
}: FormProps) {
    const [title, setPhotoTitle] = useState(initialTitle)
    const [info, setPhotoInfo] = useState(initialInfo)
    const [decade, setPhotoDecade] = useState(initialDecade)
    const [year, setPhotoYear] = useState(initialYear)
    const [date, setPhotoDate] = useState(initialDate)

    const link = `${process.env.NEXT_PUBLIC_BACKUP_LINK}${photo.url}`

    return (
        <form
            className="title"
            onSubmit={async (e) => {
                e.preventDefault()
                let code = photo.code
                await fetch("/api/edit", {
                    body: JSON.stringify({
                        title,
                        info,
                        decade,
                        year,
                        date,
                        code,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })
                onSave()
            }}
        >
            <div>
                <input
                    type="text"
                    name="title"
                    className={title === "no title" ? "title holding" : "title"}
                    placeholder={
                        title === "no title" ? "give this photo a title" : title
                    }
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div>
                <textarea
                    name="info"
                    className={info === "no info" ? "info holding" : "info"}
                    placeholder={
                        info === "no info" ? "type a description here" : info
                    }
                    onChange={(e) => setPhotoInfo(e.target.value)}
                    value={info}
                />
            </div>
            <div>
                <label htmlFor="decades">Select a decade</label>
                <select
                    name="decade"
                    id="decade"
                    className="info"
                    onChange={(e) => setPhotoDecade(e.target.value)}
                    value={decade}
                >
                    <option label=" "></option>
                    <option value="1950-59">1950s</option>
                    <option value="1960-69">1960s</option>
                    <option value="1970-79">1970s</option>
                    <option value="1980-89">1980s</option>
                    <option value="1990-99">1990s</option>
                    <option value="2000-09">2000s</option>
                    <option value="2010-19">2010s</option>
                    <option value="2020-29">2020s</option>
                </select>
            </div>
            <div>
                <input
                    type="text"
                    name="year"
                    className="info"
                    placeholder={year ? year : "type a year e.g. 1973"}
                    onChange={(e) => setPhotoYear(e.target.value)}
                    value={year}
                />
            </div>
            <div>
                <input
                    type="date"
                    name="date"
                    className="info"
                    placeholder={date ? date : "date"}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    value={date}
                />
            </div>
            <button
                disabled={!title || title === "no title"}
                className={
                    title !== "no title" ? "update-able" : "update-disabled"
                }
            >
                Update
            </button>
            <button
                onClick={() => {
                    onSave()
                }}
                className={"cancel-update update-able"}
            >
                Cancel
            </button>
        </form>
    )
}
