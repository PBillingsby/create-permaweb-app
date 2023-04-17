/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  images: {
    loader: "custom"
  }
}

module.exports = nextConfig