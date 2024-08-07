/**
File Name : login/page
Description : 로그인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.26  나경윤    Created
*/

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GoogleLogin from '@/components/auth/GoogleLogin';

export const metadata: Metadata = {
    title: '꿈틀 로그인',
    description: '꿈틀에 로그인 하고 AI 동화 생성 서비스를 이용해 보세요.'
};

export default function Login() {
    return (
        <div className="relative flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center mb-36">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={200}
                        height={0}
                        className=""
                    />
                </Link>
                <span className="text-sm text-gray-700">
                    AI 동화 생성 서비스
                </span>
                <p className="text-2xl text-main font-semibold my-10">
                    환영합니다!
                </p>
                <GoogleLogin />
                <div className="absolute bottom-0 w-full bg-main-100 h-12"></div>
            </div>
        </div>
    );
}
