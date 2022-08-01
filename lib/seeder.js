const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

async function createPhoto(photo) {

  const createdPhoto = await prisma.photo.create({
    data: {
      url:  photo.filename,
    },
  });

  console.log(createdPhoto);

};

