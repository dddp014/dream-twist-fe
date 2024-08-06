/**
File Name : buildstory/makestory-ai/page.tsx
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.28  김민규    Created
2024.07.31  김민규    Created   Ai 모델 Api 연동

**/
'use client';

import React, { useEffect, useState } from 'react';

const MakestoryAiPage: React.FC = () => {
    const [plots, setPlots] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        const storyData = localStorage.getItem('storyData');
        console.log(storyData);

        if (storyData) {
            const parsedData = JSON.parse(storyData);
            setPlots(parsedData.story || []);
            setTitle(parsedData.title || '');
            setTheme(parsedData.theme || '');
        } else {
            console.error('스토리 데이터가 없습니다.');
        }
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/storybg.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container mx-auto py-8 ">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    줄거리를 토대로 6p 플롯을 생성했어요.
                </h1>
                <p className="text-l mb-10 text-center">
                    동화책 각 페이지에 들어갈 이야기를 수정할 수 있어요.
                </p>
                <div className="p-3 bg-main-100 text-black-500 rounded-md mb-1">
                    <h1 className="text-xl font-bold mb-2">제목 : {title}</h1>
                    <h2>주제 : {theme}</h2>
                </div>
                <div className="flex overflow-x-auto w-full space-x-4 p-4 rounded-md">
                    {plots.map((plot: string, index: number) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full max-w-xs bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <h2 className="text-xl font-bold mb-2">
                                {index + 1}
                            </h2>
                            <p>{plot}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                        이 플롯으로 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakestoryAiPage;
