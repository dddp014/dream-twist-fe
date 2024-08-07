/**
File Name : api/Board
Description : 게시판 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000/fairytale';

export const getBookDetail = async (fairytaleId: string) => {
    const response = await fetch(`${API_BASE_URL}/${fairytaleId}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('동화 세부 정보 조회 실패');
    }

    return response.json();
};

export const deleteBook = async (fairytaleId: string) => {
    const response = await fetch(`${API_BASE_URL}/${fairytaleId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('동화 삭제 실패');
    }
};
