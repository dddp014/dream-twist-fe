/**
File Name : api/Auth
Description : 회원 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
2024.08.08  나경윤    Modified  로그아웃, 탈퇴 추가
*/

const API_BASE_URL = 'http://localhost:4000';

export const getUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/users`, {
        cache: 'reload',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('유저 정보 조회 실패');
    }

    return response.json();
};

export const postLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await fetch(`${API_BASE_URL}/users/logout`, options);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');

    if (!response.ok) {
        throw new Error('로그아웃 실패');
    }

    return response.json();
};

export const postUserPresigned = async (fileName: string) => {
    const response = await fetch(`${API_BASE_URL}/users/presigned-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName
        })
    });
    if (!response.ok) {
        throw new Error('AWS S3 에서 presigned URL 응답 실패');
    }
    return response.json();
};

export const deleteAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await fetch(`${API_BASE_URL}/users/delete`, options);

    if (!response.ok) {
        throw new Error('회원 탈퇴 실패');
    }

    return response.json();
};
