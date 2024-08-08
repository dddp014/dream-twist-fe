/**
File Name : api/Board
Description : 게시판 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

const API_BASE_URL = 'http://localhost:4000';

export const getBookDetail = async (fairytaleId: string) => {
    const response = await fetch(`${API_BASE_URL}/fairytale/${fairytaleId}`, {
        cache: 'reload'
    });

    if (!response.ok) {
        throw new Error('동화 세부 정보 조회 실패');
    }

    return response.json();
};

export const postBookLike = async (fairytaleId: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/fairytale/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            fairytaleId: fairytaleId
        })
    });

    if (!response.ok) {
        throw new Error('동화 좋아요 실패');
    }

    return response.json();
};

export const deleteBook = async (fairytaleId: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/fairytale/${fairytaleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('동화 삭제 실패');
    }
};
