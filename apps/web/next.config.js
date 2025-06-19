/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nathanpass/ui"],
  images: {
    domains: [
      "localhost",
      "storage.googleapis.com", // For Google Cloud Storage
    ],
  },
}

module.exports = nextConfig 