/**
File Name : apis/makeStory
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.08.02  김민규    Created
2024.08.07  임도헌   Modified  storyResponse에 제목과 주제 추가

*/

export interface StoryResponse {
    title: string;
    theme: string;
    story: string[];
}

const accessToken = localStorage.getItem('accessToken');

export const generatePlot = async (
    storyInput: string
): Promise<StoryResponse> => {
    const response = await fetch('http://localhost:4000/ai-fairytale/story', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ prompt: storyInput }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('줄거리 생성에 실패했어요. 다시 시도해주세요.');
    }

    return response.json();
};
