//TODO: fix this and integrate with next-auth
import { useState } from "react"

const LoginForm = () => {
    const [formData, setFormData] = useState(new FormData())

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await fetch("/api/auth/callback/credentials", {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (data.error) {
            console.error(data.error)
        } else {
            // Login successful, redirect to protected page
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const newFormData = new FormData()
        for (const entry of formData.entries()) {
            newFormData.append(entry[0], entry[1])
        }
        newFormData.append(name, value)
        setFormData(newFormData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.get("email")}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.get("password")}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}
