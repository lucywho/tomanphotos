import prisma from "./prisma"

async function createPhoto(photo) {
    const createdPhoto = await prisma.photo.create({
        data: {
            url: photo.filename,
        },
    })
}
