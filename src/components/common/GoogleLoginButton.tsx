/**
File Name : GoogleLoginButton.tsx
Description : 구글 로그인 버튼
Author : 박수정

History
Date        Author   Status     Description
2024.08.07  박수정    Created
2024.08.07  박수정    Modified   Google Callback 연동 

**/

'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const GoogleLoginButton: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;

            if (hash) {
                const queryParams = new URLSearchParams(hash.substring(1));
                const accessToken = queryParams.get('accessToken');
                const refreshToken = queryParams.get('refreshToken');

                if (accessToken && refreshToken) {
                    // localStorage에 토큰 저장
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    // 로그인 성공 시, 홈 화면으로 이동
                    router.push('/');
                } else {
                    // 로그인 실패 시, 로그인 화면으로 이동
                    router.push('/login');
                }
            }
        }
    });

    const googleLogin = () => {
        window.location.href = `http://localhost:4000/auth/google/login`;
    };

    return (
        <button
            type="button"
            onClick={googleLogin}
            className="flex flex-row items-center justify-center w-72 border border-gray-300 rounded-lg py-3 hover:bg-gray-50"
        >
            <Image
                src="/images/google.svg"
                alt="google-icon"
                width={20}
                height={20}
            />
            <span className="ml-4">Google로 시작하기</span>
        </button>
    );
};

export default GoogleLoginButton;
