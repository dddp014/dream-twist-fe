/**
File Name : buildstory/summery/page.tsx
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.28  김민규    Created
2024.07.31  김민규    Created   Ai 모델 Api 연동
2024.08.01  김민규    Created   로딩창 연동
2024.08.05  임도헌   Modified   ai로 생성한 데이터 로컬스토리지에 저장

*/

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Router 환경에서의 라우터를 사용
import Loading from '@/components/bulidstory/Loading';
import { generatePlot, StoryResponse } from '@/api/makeStory';
import { saveToLocalStorage } from '@/utils/localStorage';

const SummeryPage: React.FC = () => {
    const router = useRouter();
    const [storyInput, setStoryInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // 로딩 시작
        setError(null); // 이전 에러 상태 초기화

        try {
            const result: StoryResponse = await generatePlot(storyInput);
            console.log(result); // 서버 응답 확인

            // 로컬 스토리지에 데이터 저장
            // 클라이언트 사이드에서만 실행됨
            saveToLocalStorage('title', result.title);
            saveToLocalStorage('theme', result.theme);
            saveToLocalStorage('storys', result.story);

            router.push('/buildstory/makestory-ai'); // 다음 페이지로 이동
        } catch (error: any) {
            console.error('네트워크 오류:', error);
            setError('줄거리 생성에 실패했어요. 다시 시도해주세요.');
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/storybg.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container mx-auto py-8">
                {isLoading && <Loading />}{' '}
                {/* 로딩 중일 때 로딩 컴포넌트 표시 */}
                <h1 className="text-2xl font-bold text-center mb-4">
                    떠오르는 스토리를 자유롭게 적어주세요.
                </h1>
                <p className="text-center mb-8">
                    꿈틀이 적은 내용을 토대로 줄거리를 만들어드려요.
                </p>
                <div className="bg-white p-6 mx-auto w-2/3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={storyInput}
                            onChange={(e) => setStoryInput(e.target.value)}
                            className="w-full h-72 p-4 rounded-md bg-main-100 resize-none mb-2 focus:outline-none"
                            placeholder="동화의 첫 문장을 적어주세요"
                        ></textarea>
                        <p className="mt-4 text-gray-700">
                            Tips!! 동화의 내용을 구체적으로 적을 수록 더 멋진
                            동화를 만들어줘요!
                            <br />
                            <br />
                            예시1) 소피아가 신비로운 마법의 숲을 탐험하며
                            친구들과 함께 숲을 지켜내는 이야기
                            <br />
                            예시2) 동물친구들 - 꼬마거북 핀과 친구들이 연이 친구
                            코아와 함께 온갖 모험을 떠난다.
                            <br />
                            예시3) 최선임양을 주인공과 고양이를 주인공으로 그린
                            이야기나 인형의 무한모험의 줄거리
                        </p>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="mt-10 bg-main text-white py-2.5 px-6 rounded-md"
                            >
                                줄거리 생성하기 -10 나뭇잎
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummeryPage;
