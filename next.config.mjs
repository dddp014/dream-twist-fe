/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/buildstory/summery', // 프록시할 경로
                destination: 'http://localhost:4000/ai-fairytale/story' // 실제 API 서버
            }
        ];
    }
};

export default nextConfig;
