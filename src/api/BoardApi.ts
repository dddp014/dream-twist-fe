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

export const postBookView = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/fairytale/view`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            fairytaleId: id
        })
    });
    if (!response.ok) {
        throw new Error('이미 조회된 동화');
    }
    return response.json();
};

export const postBookLike = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/fairytale/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            fairytaleId: id
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

export const postComment = async (id: string, text: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            fairytaleId: id,
            content: text
        })
    });

    // if (!response.ok) {
    //     throw new Error('댓글 생성 실패');
    // }

    if (response.status === 400) {
        alert('댓글은 최대 3개까지 작성이 가능합니다.');
    }

    return response.json();
};

export const getComment = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('댓글 조회 실패');
    }

    return response.json();
};

export const putComment = async (id: string, comtId: string, text: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/comments/${id}/${comtId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            content: text
        })
    });

    if (!response.ok) {
        throw new Error('댓글 수정 실패');
    }

    return response.json();
};

export const deleteComment = async (comId: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}/comments/${comId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('댓글 삭제 실패');
    }
};
