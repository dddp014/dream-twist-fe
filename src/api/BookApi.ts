/**
File Name : api/BookApi
Description : Book 컴포넌트 api 모음
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.03  임도헌   Modified   fetchPresignedURL,uploadFileToS3,submitBookForm 추가
2024.08.07  임도헌   Modified   updateBookForm 추가
2024.08.07  임도헌   Modified   fetchAiImage 추가
2024.08.07  임도헌   Modified   금지어 json으로 반환
*/

const API_BASE_URL = 'http://localhost:4000/fairytale';
const accessToken = localStorage.getItem('accessToken');

export const fetchPresignedURL = async (userId: number, fileName: string) => {
    const response = await fetch(`${API_BASE_URL}/presigned-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            userId,
            fileName
        })
    });
    if (!response.ok) {
        throw new Error('AWS S3 에서 presigned URL 응답 실패');
    }
    return response.json();
};

export const uploadFileToS3 = async (presignedURL: string, file: File) => {
    const response = await fetch(presignedURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: file
    });

    if (!response.ok) {
        throw new Error('AWS S3로 파일 업로드 실패');
    }
    // PresignedURL에서 ?앞 부분이 파일 url임
    return presignedURL.split('?')[0];
};

export const submitBookForm = async (formdata: FormData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    });

    if (!response.ok) {
        return response.json();
    }

    return response.text();
};

export const updateBookForm = async (
    formdata: FormData,
    fairytailId: number
) => {
    const response = await fetch(`${API_BASE_URL}/${fairytailId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    });

    if (!response.ok) {
        return response.json();
    }

    return response.text();
};

export const fetchAiImage = async (prompt: string): Promise<string> => {
    const response = await fetch(`http://localhost:4000/ai-fairytale/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ prompt }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('AI 요청 실패');
    }

    return response.text();
};
