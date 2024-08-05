/**
File Name : api/Mypage
Description : 마이페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000';

export const getMyPayList = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/billing/${userId}`, {
            cache: 'no-store'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return error;
    }
};
