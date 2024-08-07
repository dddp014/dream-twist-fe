/**
File Name : buildstory/makestory-ai/page.tsx
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.28  김민규    Created
2024.07.31  김민규    Created   Ai 모델 Api 연동
2024.08.05  임도헌   Modified   이 플롯으로 완료 페이지 링크 추가
2024.08.06  임도헌   Modified   useFairytailInfo로 storys 가져오는 코드로 변경

**/
'use client';

import { useFairytailInfo } from '@/hooks/useFairytailInfo';
import Link from 'next/link';
import React from 'react';

const MakestoryAiPage: React.FC = () => {
    const { storys } = useFairytailInfo();

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
                <div className="flex overflow-x-auto w-full space-x-4">
                    {storys.map((story: string, index: number) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full max-w-xs bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <h2 className="text-xl font-bold mb-2">
                                {index + 1}
                            </h2>
                            <p className="text-center">{story}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <Link
                        href="/create"
                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                        이 플롯으로 완료
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MakestoryAiPage;
