/**
File Name : api/Main
Description : 메인 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.07.31  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000/fairytale';

export const getBookList = async () => {
    const response = await fetch(`${API_BASE_URL}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('전체 동화 리스트 조회 실패');
    }

    return response.json();
};
