/**
File Name : main/BookList
Description : 메인 북 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.22  나경윤    Created
2024.07.23  나경윤    Modified  무한 스크롤 추가
*/

'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { FairytaleInfo } from '@/types/fairytale';

interface BookListProps {
    fairytaleInfo: FairytaleInfo[];
}

const itemsPerPage: number = 10;

const BookList = ({ fairytaleInfo }: BookListProps) => {
    const router = useRouter();
    const [items, setItems] = useState(fairytaleInfo.slice(0, itemsPerPage));
    const pageIndexRef = useRef<number>(2);

    const loadItems = () => {
        const newItems = fairytaleInfo.slice(
            (pageIndexRef.current - 1) * itemsPerPage,
            pageIndexRef.current * itemsPerPage
        );

        if (newItems.length < itemsPerPage) {
            setEnd(true);
        }

        setItems((prev) => [...prev, ...newItems]);
        pageIndexRef.current++;
    };

    const { ref, isPageEnd, setEnd } = useInfiniteScroll({
        onLoadMore: loadItems
    });

    return (
        <div className="flex flex-col justify-between">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 gap-y-9 my-10 z-0">
                {items.map((item) => (
                    <button
                        key={item.fairytaleId}
                        onClick={() =>
                            router.push(`/board/${item.fairytaleId}`)
                        }
                        className="relative max-w-[18rem] w-full aspect-[4/5] border border-gray-200 rounded-xl bg-white overflow-hidden transition-transform animate-scaleIn"
                    >
                        <div
                            className="absolute top-0 w-full h-full overflow-hidden"
                            style={{
                                backgroundImage: `url(${item.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                                height: '78%'
                            }}
                        />
                        <div className="absolute bg-white bottom-0 w-full text-left py-3 pl-4">
                            <p className="text-[1.15rem] font-semibold">
                                {item.title}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-[1rem]">
                                    {item.nickname} 작가
                                </p>
                                <p className="text-[0.8rem] text-gray-400 mr-4 -mb-0.5">
                                    {item.createdAt}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            {!isPageEnd && <div ref={ref} />}
        </div>
    );
};

export default BookList;
