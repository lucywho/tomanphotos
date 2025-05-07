import prisma from "../../../lib/prisma"
import { getPhotoByCode } from "../../../lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")

    if (!code) {
        return NextResponse.json(
            { error: "Photo code is required" },
            { status: 400 }
        )
    }

    try {
        const photo = await prisma.photo.findFirst({
            where: {
                code: parseInt(code),
            },
            select: {
                id: true,
            },
        })

        if (!photo) {
            return NextResponse.json(
                { error: "Photo not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(photo)
    } catch (error) {
        console.error("Error fetching photo by code:", error)
        return NextResponse.json(
            { error: "Failed to fetch photo" },
            { status: 500 }
        )
    }
}
