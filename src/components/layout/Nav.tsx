/**
File Name : Nav
Description : 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../assets/images/logo.svg';

export default function Nav() {
    return (
        <nav className="flex flex-row items-center justify-around py-3 text-lg shadow-md shadow-neutral-100">
            <Image
                src={Logo}
                alt="logo"
                width={90}
                className="mr-[16rem] -ml-4"
            />
            <div className="space-x-14 pt-1">
                <Link href="/" className="hover:text-main cursor-pointer">
                    동화 보러가기
                </Link>
                <Link href="/" className="hover:text-main cursor-pointer">
                    동화 만들기
                </Link>
                <Link href="/" className="hover:text-main cursor-pointer">
                    꿈틀 가이드
                </Link>
                <Link href="/" className="hover:text-main cursor-pointer">
                    서비스 소개
                </Link>
            </div>
            <div className="pt-1 space-x-4 pl-[13%] -mr-2">
                <Link
                    href="/"
                    className="hover:text-main cursor-pointer text-base"
                >
                    회원가입
                </Link>
                <Link
                    href="/"
                    className="bg-main py-2 px-4 rounded-[7px] text-white cursor-pointer text-base"
                >
                    로그인
                </Link>
            </div>
        </nav>
    );
}
