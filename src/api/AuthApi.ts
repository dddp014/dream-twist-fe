/**
File Name : api/Auth
Description : 회원 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000';

export const getLogin = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/google/login`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('로그인 실패');
    }

    return response.json();
};
