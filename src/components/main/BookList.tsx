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

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { FairytaleInfo } from '@/types/fairytale';
import Sample2 from '../../../public/images/sample2.svg';

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
        <div>
            <div className="grid grid-cols-5 gap-8 gap-y-9 my-10 z-0">
                {items.map((item) => (
                    <button
                        key={item.fairytaleId}
                        onClick={() =>
                            router.push(`/board/${item.fairytaleId}`)
                        }
                        className="relative w-[18rem] h-[25rem] border border-gray-200 rounded-xl bg-white overflow-hidden transition-transform animate-scaleIn"
                    >
                        <div
                            className="absolute top-0 w-full"
                            style={{
                                backgroundImage: `url(${Sample2.src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                                height: '80%'
                            }}
                        />
                        <div className="absolute bottom-3.5 left-5 w-full text-left">
                            <p className="text-xl font-semibold ">
                                {item.title}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-base">
                                    {item.nickname} 작가
                                </p>
                                <p className="text-xs text-gray-400 mr-10">
                                    2024-08-02
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
