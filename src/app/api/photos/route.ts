import prisma from "../../../lib/prisma"
import { addmore } from "../../../lib/config"
import { getPhotos } from "../../../lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const take = parseInt(searchParams.get("take") || String(addmore), 10)
    const cursor = searchParams.get("cursor")
    const include = searchParams.get("include") === "true"

    try {
        let photos
        if (cursor) {
            photos = await getPhotos(prisma, take, { id: cursor }, include)
        } else {
            photos = await getPhotos(prisma, take)
        }

        return NextResponse.json(photos)
    } catch (error) {
        console.error("Error fetching photos:", error)
        return NextResponse.json(
            { error: "Failed to fetch photos" },
            { status: 500 }
        )
    }
}
