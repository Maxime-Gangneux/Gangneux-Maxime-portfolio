/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Gangneux-Maxime-portfolio',
  trailingSlash: false,
};

module.exports = nextConfig;
