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
