require("dotenv").config()
const AWS = require("aws-sdk")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const BUCKET_NAME = process.env.BUCKET_NAME ?? ""

let numberOfPhotos

function configureAwsClient() {
    let s3

    if (process.env.LOCAL_AWS_ENDPOINT) {
        s3 = new AWS.S3({
            region: process.env.AWS_REGION,
            forcePathStyle: true,
            endpoint: process.env.LOCAL_AWS_ENDPOINT,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })
    } else {
        s3 = new AWS.S3({
            region: process.env.AWS_REGION,
            forcePathStyle: true,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })
    }

    return s3
}

async function getObjects(client, bucket, prefix) {
    let isTruncated = true
    let marker
    let photos = new Array()

    while (isTruncated) {
        let params = { Bucket: bucket }
        if (prefix) params.Prefix = prefix
        if (marker) params.Marker = marker
        try {
            const response = await client.listObjects(params).promise()

            response.Contents.forEach((item) => {
                photos.push(item)
            })

            isTruncated = response.IsTruncated
            if (isTruncated) {
                marker = response.Contents.slice(-1)[0].Key
            }
        } catch (error) {
            throw error
        }
    }

    return photos
}

async function run() {
    const s3client = configureAwsClient()

    const photos = await getObjects(s3client, BUCKET_NAME, null)

    numberOfPhotos = photos.length

    await photos.reduce(async (memo, photo) => {
        await memo
        await createPhoto(photo)
    }, undefined)
}

async function createPhoto(photo) {
    const logOutput = numberOfPhotos + " " + photo.Key

    // const createdPhoto = await prisma.photo.upsert({
    //     where: {
    //         url: photo.Key,
    //     },
    //     update: {
    //         url: photo.Key,
    //     },
    //     create: {
    //         url: photo.Key,
    //     },
    // })

    numberOfPhotos = numberOfPhotos - 1

    console.log(logOutput);
}

run()
