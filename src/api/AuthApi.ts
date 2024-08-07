/**
File Name : api/Auth
Description : 회원 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000';

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

    if (!response.ok) {
        throw new Error('로그아웃 실패');
    }

    return response.json();
};
