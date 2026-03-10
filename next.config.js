/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'b.zmtcdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
