/**
File Name : apis/makeStory
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.08.02  김민규    Created

*/


export interface StoryResponse {
    story: string[];
}

export const generatePlot = async (
    storyInput: string
): Promise<StoryResponse> => {
    const response = await fetch('http://localhost:4000/ai-fairytale/story', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ prompt: storyInput }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('줄거리 생성에 실패했어요. 다시 시도해주세요.');
    }

    return response.json();
};
