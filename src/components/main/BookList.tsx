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

interface BookListProps {
    bookInfo: {
        fairytaleId: number;
        title: string;
        theme: string;
        nickname: string;
        coverImage: string;
    }[];
}

const itemsPerPage: number = 10;

const BookList = ({ bookInfo }: BookListProps) => {
    const router = useRouter();
    const [items, setItems] = useState(bookInfo.slice(0, itemsPerPage));
    const pageIndexRef = useRef<number>(2);

    const loadItems = () => {
        const newItems = bookInfo.slice(
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
                    <div key={item.fairytaleId} className="relative">
                        <div className="absolute bottom-3 left-5">
                            <p className="text-lg font-semibold -mb-1">
                                {item.title}
                            </p>
                            <p>{item.nickname} 작가</p>
                        </div>
                        <Image
                            src="/images/sample1.svg"
                            alt="book-image"
                            onClick={() =>
                                router.push(`/board/${item.fairytaleId}`)
                            }
                            className="w-[18rem] h-[25rem] border border-gray-200 rounded-xl bg-white cursor-pointer transition-transform animate-scaleIn"
                            width={100}
                            height={300}
                        />
                    </div>
                ))}
            </div>
            {!isPageEnd && <div ref={ref} />}
        </div>
    );
};

export default BookList;
