/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "localhost",
            "toman-test.s3.eu-central-1.amazonaws.com/",
            "toman-test.s3.eu-central-1.amazonaws.com",
            "toman-test-s3.amazonaws.com",
        ],
    },
}

module.exports = nextConfig
