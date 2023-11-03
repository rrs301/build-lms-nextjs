/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/',
            destination: '/browse', // Replace with the actual path of your default page
          },
        ];
      },
    images:{
        unoptimized:true,
        domains:['media.graphassets.com']
    }
}

module.exports = nextConfig
