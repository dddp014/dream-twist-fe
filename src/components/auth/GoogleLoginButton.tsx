/**
File Name : GoogleLoginButton.tsx
Description : 구글 로그인 버튼
Author : 박수정

History
Date        Author   Status     Description
2024.08.07  박수정    Created
2024.08.07  박수정    Modified   Google Callback 연동
2024.08.07  나경윤    Modified   토큰 저장 분리
**/

'use client';

import Image from 'next/image';

export default function GoogleLoginButton() {
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
}
