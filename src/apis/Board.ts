/**
File Name : api/Board
Description : 게시판 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

export const getBookDetail = async (fairytaleId: string) => {
    try {
        const response = await fetch(
            `http://localhost:4000/fairytale/${fairytaleId}`,
            {
                cache: 'no-store'
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return error;
    }
};
