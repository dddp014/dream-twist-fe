/**
File Name : auth/GetToken
Description : 로그인 후 토큰 저장
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
2024.08.07  나경윤    Modified   토큰 저장 분리
*/

'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/api/AuthApi';

const JWT_EXPIRY_TIME = 15 * 60 * 1000;

export default function GetToken() {
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
                console.log('실행되나???');
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    return null;
}
