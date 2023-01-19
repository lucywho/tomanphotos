import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(501).end()
    }

    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "not logged in" })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.status(401).json({ message: "user not found" })

    if (!user.isAdmin)
        return res.status(401).json({ message: "user not authorised" })

    await prisma.photo.update({
        data: {
            title: req.body.title,
            info: req.body.info,
            date: req.body.date,
            year: req.body.year,
            decade: req.body.decade,
        },
        where: {
            code: req.body.code,
        },
    })

    res.end()
    return
}
