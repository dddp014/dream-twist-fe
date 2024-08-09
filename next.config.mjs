/** @type {import('next').NextConfig} */
const nextConfig = {
    // next/image 컴포넌트가 외부 도메인의 이미지를 로드할 수 있게 설정
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'dreamtwist-bucket.s3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/**' // 모든 경로를 허용
            },
            {
                protocol: 'https',
                hostname: 'dreamtwist-bucket.s3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/**' // 모든 경로를 허용
            }
        ]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    },
    reactStrictMode: false
};

export default nextConfig;
