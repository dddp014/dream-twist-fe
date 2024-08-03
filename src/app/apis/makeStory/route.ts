export interface StoryResponse {
    // 서버 응답에 따라 인터페이스 정의
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
