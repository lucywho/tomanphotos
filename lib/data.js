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
    code = parseInt(code)
    const photo = await prisma.photo.findUnique({
        where: {
            code: code,
        },
    })

    return photo
}
