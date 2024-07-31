/**
File Name : api/Main
Description : 메인 페이지 api 함수
Author : 나경윤

History
Date        Author   Status    Description
2024.07.31  나경윤    Created
*/

export const getBookList = async () => {
    return fetch('http://localhost:4000/fairytale')
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => {
            console.error('error:', error);
            return error;
        });
};
