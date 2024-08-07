/**
File Name : hooks/useAiImage
Description : ai 이미지 생성 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.07  임도헌   Created   useAiImage 생성
*/

import { fetchAiImage } from '@/api/BookApi';
import { useState } from 'react';

export function useAiImage() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const generateImage = async (prompt: string) => {
        setLoading(true);
        try {
            const imageUrl = await fetchAiImage(prompt); // API 호출
            setImageUrl(imageUrl);
        } catch (error) {
            console.error('AI 요청 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, imageUrl, generateImage };
}
