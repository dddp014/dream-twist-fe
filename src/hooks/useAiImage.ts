/**
File Name : hooks/useAiImage
Description : ai 이미지 생성 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.07  임도헌   Created   useAiImage 생성
2024.08.08  임도헌   Modified  eslint 에러 처리
*/

import { useState } from 'react';
import { fetchAiImage } from '@/api/BookApi';

export default function useAiImage() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const generateImage = async (prompt: string) => {
        setLoading(true);
        try {
            const fetchImageUrl = await fetchAiImage(prompt); // API 호출
            setImageUrl(fetchImageUrl);
        } catch (error) {
            throw new Error('AI 요청 중 오류 발생');
        } finally {
            setLoading(false);
        }
    };

    return { loading, imageUrl, generateImage };
}
