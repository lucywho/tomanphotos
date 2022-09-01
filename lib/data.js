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

export const getPhoto = async (id, prisma) => {
    const photo = await prisma.photo.findUnique({
        where: {
            id: id,
        },
    })

    return photo
}
