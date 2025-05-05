export const getPhotos = async (prisma, take, cursor) => {
    const photos = await prisma.photo.findMany({
        where: {},
        orderBy: [
            {
                code: "asc",
            },
        ],
        take,
        cursor,
        skip: cursor ? 1 : 0,
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
