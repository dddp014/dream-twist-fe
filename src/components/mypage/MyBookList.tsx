/**
File Name : mypage/MyBookList
Description : 마이페이지 동화 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.03  나경윤    Created
*/

'use client';

import { useState } from 'react';
import { sampleImages } from '@/utils/dummyBooks';

interface MyBookListProps {
    bookInfo: {
        // fairytaleId: number;
        // title: string;
        // nickname: string;
        coverImage: string;
    }[];
}

export default function MyBookList({ bookInfo }: MyBookListProps) {
    const [bookCount, setBookCount] = useState(6);
    const [viewClick, setViewClick] = useState(false);

    const handleLoadMore = () => {
        viewClick ? setBookCount(6) : setBookCount(sampleImages.length);
        setViewClick(!viewClick);
    };

    return (
        <div className="flex flex-col justify-center mt-6">
            <div className="grid grid-cols-6 gap-7">
                {bookInfo.slice(0, bookCount).map((item, index) => (
                    <button
                        key={index}
                        className="relative w-[15rem] h-[19rem] border rounded-lg border-gray-200 overflow-hidden"
                    >
                        <div
                            className="absolute top-0 left-0 w-full"
                            style={{
                                backgroundImage: `url(${item.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                                height: '78%'
                            }}
                        ></div>
                        <div className="absolute bottom-0 w-full py-2 text-left pl-4">
                            <p className="text-[1.05rem] font-medium">
                                동화 제목
                            </p>
                            <div className="flex justify-between items-center pr-3">
                                <p className="text-[0.9rem]">민규 작가</p>
                                <p className="text-xs text-gray-400">
                                    2024-08-02
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="text-center">
                {bookInfo.length > 6 && (
                    <button
                        onClick={handleLoadMore}
                        className={`mt-10 w-24 h-[2.1rem] ${viewClick ? 'bg-main-200' : 'bg-main'} text-white rounded-3xl text-[0.95rem]`}
                    >
                        {viewClick ? '접기' : '전체 보기'}
                    </button>
                )}
            </div>
        </div>
    );
}
