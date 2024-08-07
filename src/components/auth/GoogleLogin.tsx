/**
File Name : auth/GoogleLogin
Description : 구글로그인 버튼
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
*/

'use client';

import Image from 'next/image';

export default function GoogleLogin() {
    const handleLoginClick = () => {
        window.location.href = 'http://localhost:4000/auth/google/login';
    };

    return (
        <>
            <button
                type="button"
                onClick={handleLoginClick}
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
        </>
    );
}
