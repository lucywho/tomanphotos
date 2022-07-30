require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const prisma = new PrismaClient();
const BUCKET_NAME = process.env.BUCKET_NAME ?? '';

function configureAwsClient() {

  let s3client;

  if (process.env.LOCAL_AWS_ENDPOINT) {
    s3client = new S3Client({ 
      region: process.env.AWS_REGION ?? '',
      endpoint: process.env.LOCAL_AWS_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });    
  } else {
    s3client = new S3Client({ 
      forcePathStyle: true,
      region: process.env.AWS_REGION ?? '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  return s3client;
}

async function getObjects(s3client) {

  const command = new ListObjectsCommand({ Bucket: BUCKET_NAME });

  const response = await s3client.send(command).then( data => {
    const filenames = data.Contents.map( element => {
      return element.Key;
    })
    return filenames;
  }).catch( err => {
    console.log(err);
  });

  return response;

}

async function run() {

  const s3client = configureAwsClient();

  const photos = await getObjects(s3client);

  await photos.reduce(async (memo, photo) => {
    await memo;
    await createPhoto(photo);  
  }, undefined);

}

async function createPhoto(photo) {
  console.log(photo);
  const createdPhoto = await prisma.photo.upsert({
    where: {
      url:  photo
    },
    update: {
      url:  photo,
    },
    create: {
      url:  photo,
    },
  });

  console.log(createdPhoto);

};

run();

