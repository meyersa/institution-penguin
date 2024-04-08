/** @type {import('next').NextConfig} */
module.exports = {
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '/u/**',
          },
          {
            protocol: 'https', 
            hostname: 'cdn.discordapp.com',
            pathname: '/avatars/**'
          }
        ],
      },
}