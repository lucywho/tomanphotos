export const getPhotos = async (prisma) => {
    const photos = await prisma.photo.findMany({
        where: {},
        orderBy: [
            {
                id: "desc",
            },
        ],
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
