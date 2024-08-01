/**
File Name : api/Main
Description : 메인 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.07.31  나경윤    Created
*/

export const getBookList = async () => {
    try {
        const response = await fetch('http://localhost:4000/fairytale');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return error;
    }
};
