export const getPhotos = async (prisma, take, cursor, include = false) => {
    // Handle positive take (getting photos after cursor)
    if (take > 0 && cursor) {
        const photos = await prisma.photo.findMany({
            where: {},
            orderBy: [
                {
                    code: "asc",
                },
            ],
            take,
            cursor,
            skip: include ? 0 : 1, // Skip cursor unless include is true
        })
        return photos
    }

    // Handle negative take (getting photos before cursor)
    if (take < 0 && cursor) {
        const absoluteTake = Math.abs(take)

        // Include flag is true when returning from single photo view
        if (include) {
            // First get the photo with the cursor ID
            const cursorPhoto = await prisma.photo.findUnique({
                where: {
                    id: cursor.id,
                },
            })

            if (!cursorPhoto) {
                return []
            }

            // Then get photos starting from this cursor photo
            const photosAfter = await prisma.photo.findMany({
                where: {},
                orderBy: [
                    {
                        code: "asc",
                    },
                ],
                take: absoluteTake,
                cursor: {
                    id: cursor.id,
                },
                skip: 0, // Include the cursor photo
            })

            return photosAfter
        } else {
            // Standard "load less" behavior - get photos before cursor
            const photos = await prisma.photo.findMany({
                where: {},
                orderBy: [
                    {
                        code: "desc",
                    },
                ],
                take: absoluteTake,
                cursor,
                skip: 1, // Skip cursor
            })

            // Reverse the results to get ascending order
            return photos.reverse()
        }
    }

    // No cursor case (first page of results)
    const photos = await prisma.photo.findMany({
        where: {},
        orderBy: [
            {
                code: "asc",
            },
        ],
        take,
    })
    return photos
}

export const getPhoto = async (code, prisma) => {
    const intCode = parseInt(code)
    const photo = await prisma.photo.findUnique({
        where: {
            code: intCode,
        },
    })

    return photo
}

export const getPhotoByCode = async (code, prisma) => {
    const intCode = parseInt(code)
    const photo = await prisma.photo.findUnique({
        where: {
            code: intCode,
        },
    })

    return photo
}

export const getUser = async (userId, prisma) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    return user
}

export const updateUserToAdmin = async (userId, prisma, isAdminEmail) => {
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            isAdmin: isAdminEmail,
        },
    })
}
