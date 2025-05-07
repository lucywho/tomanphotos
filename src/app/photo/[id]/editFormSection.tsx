"use client"
import React from "react"
import { Form } from "../../../components/Form"

export function EditFormSection({ photo }: { photo: any }) {
    const [showForm, setShowForm] = React.useState(false)
    if (!showForm) {
        return (
            <button className="edit" onClick={() => setShowForm(true)}>
                Edit this information
            </button>
        )
    }
    return (
        <Form
            photo={photo}
            initialTitle={photo.title || "no title"}
            initialInfo={photo.info || "no info"}
            initialDecade={photo.decade || ""}
            initialYear={photo.year || ""}
            initialDate={photo.date || ""}
            onSave={() => setShowForm(false)}
        />
    )
}
