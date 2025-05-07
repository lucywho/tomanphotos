/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "toman-test.s3.eu-central-1.amazonaws.com/",
            "toman-test.s3.eu-central-1.amazonaws.com",
            "toman-test-s3.amazonaws.com",
            "slides-backup-20220722.s3.eu-central-1.amazonaws.com/",
            "slides-backup-20220722.s3.eu-central-1.amazonaws.com",
            "slides-backup-20220722.amazonaws.com",
        ],
    },
}

module.exports = nextConfig
