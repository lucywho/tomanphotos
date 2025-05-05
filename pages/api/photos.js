import prisma from "../../src/lib/prisma"
import { addmore } from "../../src/lib/config"
import { getPhotos } from "../../src/lib/data.js"

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(501).end()
    }

    const take = parseInt(req.query.take || addmore)
    const cursor = req.query.cursor || null

    if (!cursor) {
        res.status(400).send({ error: "Missing cursor parameter" })
    }

    const photos = await getPhotos(prisma, take, { id: cursor })

    res.json(photos)
}
