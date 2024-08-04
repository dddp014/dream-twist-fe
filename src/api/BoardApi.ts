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
    try {
        const response = await fetch(`${API_BASE_URL}/${fairytaleId}`, {
            cache: 'no-store'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return error;
    }
};

export const deleteBook = async (fairytaleId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${fairytaleId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return error;
    }
};
