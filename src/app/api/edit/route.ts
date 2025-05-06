import prisma from "../../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import type { Session } from "next-auth"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(501).end()
    }

    const session: Session | null = await getServerSession(
        req,
        res,
        authOptions
    )
    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ message: "not logged in" })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.status(401).json({ message: "user not found" })

    if (!user.isAdmin)
        return res.status(401).json({ message: "user not authorised" })

    const conCode = parseInt(req.body.code)

    await prisma.photo.update({
        data: {
            title: req.body.title,
            info: req.body.info,
            date: req.body.date,
            year: req.body.year,
            decade: req.body.decade,
        },
        where: {
            code: conCode,
        },
    })

    res.end()
    return
}
