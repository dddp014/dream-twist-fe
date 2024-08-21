/**
File Name : api/Main
Description : 메인 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.07.31  나경윤    Created
*/

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getBookList = async () => {
    const response = await fetch(`${API_BASE_URL}/fairytale`, {
        cache: 'reload'
    });

    if (!response.ok) {
        throw new Error('전체 동화 리스트 조회 실패');
    }

    return response.json();
};

export const getSearchBook = async (value: string) => {
    const response = await fetch(`${API_BASE_URL}/fairytale/byTitle/${value}`, {
        cache: 'reload'
    });

    if (!response.ok) {
        throw new Error('검색 동화 조회 실패');
    }

    return response.json();
};
