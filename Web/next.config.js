/** @type {import('next').NextConfig} */

const nextConfig = {
    // To add support for Docker
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picst.sunbangyan.cn',
            port: '',
            pathname: '/2023',
          },
        ],
      },
}

module.exports = nextConfig
