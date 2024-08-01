/**
File Name : buildstory/summery/page.tsx
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.28  김민규    Created

**/
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router 환경에서의 라우터 사용

const SummeryPage: React.FC = () => {
    const router = useRouter();
    const [storyInput, setStoryInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const generatePlot = async () => {
        try {
            const response = await fetch(
                'http://localhost:4000/ai-fairytale/story',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({ prompt: storyInput }),
                    credentials: 'include'
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log(result); // 서버 응답 확인
                // const storyId = Math.random().toString(36).substring(2); // 고유한 ID 생성
                // console.log(result);
                // setGeneratedPlot(JSON.stringify(result.story)); // 받아온 줄거리가 객체형태로 오므로 다시 stringfy 해줘야함

                // 서버에 스토리 저장
                // await fetch('/api/saveStory', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({ id: storyId, story: result })
                // });
                // 로컬 스토리지에 데이터 저장
                localStorage.setItem('storyData', JSON.stringify(result));

                router.push('/buildstory/makestory-ai');
                setError(null); // 오류 상태 초기화한다.
            } else {
                console.error('서버 오류:', response.statusText);
                setError('줄거리 생성에 실패했어요. 다시 시도해주세요.');
            }
        } catch (error: any) {
            console.error('네트워크 오류:', error.error);
            setError('네트워크 오류가 발생했어요. 다시 시도해주세요.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        generatePlot(); // 폼 제출 시 줄거리 생성 함수를 호출한다
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">
                떠오르는 스토리를 자유롭게 적어주세요.
            </h1>
            <p className="text-center mb-8">
                꿈틀이 적은 내용을 토대로 줄거리를 만들어드려요.
            </p>
            <div className="bg-white p-6 mx-auto w-2/3">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={storyInput}
                        onChange={(e) => setStoryInput(e.target.value)}
                        className="w-full h-72 p-4 rounded-md bg-main-100 resize-none mb-2 focus:outline-none"
                        placeholder="동화의 첫 문장을 적어주세요"
                    ></textarea>

                    <p className="mt-4 text-gray-700">
                        Tips!! 동화의 내용을 구체적으로 적을 수록 더 멋진 동화를
                        만들어줘요!
                        <br />
                        <br />
                        예시1) 소피아가 신비로운 마법의 숲을 탐험하며 친구들과
                        함께 숲을 지켜내는 이야기
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
                            줄거리 생성하기
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
    );
};

export default SummeryPage;
