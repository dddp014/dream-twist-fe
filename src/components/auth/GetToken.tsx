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
import { useRouter } from 'next/navigation';

export default function GetToken() {
    const router = useRouter();

    useEffect(() => {
        // 현재 URL 해시 부분에서 토큰 추출
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const queryParams = new URLSearchParams(window.location.search);

        const error = queryParams.get('error');
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        console.log('Error:', error);

        if (error === 'access_denied') {
            router.push('/login');
        } else if (accessToken && refreshToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // URL 해시 제거
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    return <div style={{ display: 'none' }} />;
}
