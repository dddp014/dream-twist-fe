/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.course-api.com',
                port: '',
                pathname: '/images/tours/**'
            }
        ]
    }
};

export default nextConfig;
