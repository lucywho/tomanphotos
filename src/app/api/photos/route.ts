import prisma from "../../../lib/prisma"
import { addmore } from "../../../lib/config"
import { getPhotos } from "../../../lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const take = parseInt(searchParams.get("take") || String(addmore), 10)
    const cursor = searchParams.get("cursor")

    let photos
    if (cursor) {
        photos = await getPhotos(prisma, take, { id: cursor })
    } else {
        photos = await getPhotos(prisma, take)
    }

    return NextResponse.json(photos)
}
