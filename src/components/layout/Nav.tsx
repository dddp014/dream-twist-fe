/**
File Name : Nav
Description : 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
2024.08.07  나경윤    Modified    로그인 연결
2024.08.10  나경윤    Modified    네브바에서 토큰 처리
*/

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoginNav from './LoginNav';
import { getUserInfo } from '@/api/AuthApi';

const JWT_EXPIRY_TIME = 15 * 60 * 1000;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        profileImage: ''
    });
    const [isAuth, setIsAuth] = useState(false);

    const isBuild = pathname.startsWith('/buildstory');
    const isMain = pathname === '/';

    useEffect(() => {
        // 현재 URL 해시 부분에서 토큰 추출
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // 만료 시간 설정 및 저장
            const expiryTime = Date.now() + JWT_EXPIRY_TIME;
            localStorage.setItem('tokenExpiry', expiryTime.toString());

            // URL 해시 제거
            window.history.replaceState(null, '', window.location.pathname);
        }

        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();

                localStorage.setItem('email', data.email);
                localStorage.setItem('nickname', data.nickname);
                localStorage.setItem('profileImage', data.profileImage);

                const storedNickName = localStorage.getItem('nickname') || '';
                const storedProfileImage =
                    localStorage.getItem('profileImage') || '';
                if (storedNickName) {
                    setIsAuth(true);

                    setUserInfo({
                        nickname: storedNickName,
                        profileImage: storedProfileImage
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        const tokenExpiryTime = tokenExpiry ? parseInt(tokenExpiry, 10) : 0;

        // 토큰 유효성 확인
        if (token && tokenExpiry && Date.now() < tokenExpiryTime) {
            setIsAuth(true);
            setTimeout(refreshToken, tokenExpiryTime - Date.now() - 60000); // 만료 1분 전에 재발급
        } else {
            setIsAuth(false);
            if (
                pathname.startsWith('/buildstory') ||
                pathname.startsWith('/edit') ||
                pathname.startsWith('/mypage')
            ) {
                router.push('/login');
            }
        }
    }, [pathname, router]);

    const refreshToken = async () => {
        const token = localStorage.getItem('refreshToken');
        try {
            const response = await fetch(
                `${API_BASE_URL}/auth/regenerate-accesstoken`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refreshToken: token
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenExpiry');
                    router.push('/login');
                    return;
                }
                throw new Error(data.message || '토큰 재발급 실패');
            }

            onLoginSuccess(data.accessToken);
            console.info('silent-success');
        } catch (error) {
            console.error(error);
        }
    };

    const onLoginSuccess = async (token: string) => {
        const expiryTime = Date.now() + JWT_EXPIRY_TIME;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        setIsAuth(true);
        setTimeout(refreshToken, JWT_EXPIRY_TIME - 60000); // 만료 1분 전에 재발급
    };

    if (pathname === '/login') {
        return null;
    }

    return (
        <nav className="flex flex-row items-center justify-between px-24 py-3 text-lg shadow-md shadow-neutral-100">
            <Link href="/" className="cursor-pointer">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={90}
                    height={0}
                />
            </Link>
            <div className="space-x-20 pt-1">
                <Link
                    href="/"
                    className={`hover:text-main cursor-pointer ${isMain ? 'text-main' : ''}`}
                >
                    동화 갤러리
                </Link>
                <Link
                    href="/buildstory"
                    className={`hover:text-main cursor-pointer ${isBuild ? 'text-main' : ''}`}
                >
                    동화 만들기
                </Link>
            </div>
            <div className="pt-1 space-x-4">
                {isAuth ? (
                    <LoginNav userInfo={userInfo} />
                ) : (
                    <Link
                        href="/login"
                        className="bg-main py-2 px-4 rounded-[7px] text-white cursor-pointer text-base"
                    >
                        로그인
                    </Link>
                )}
            </div>
        </nav>
    );
}
