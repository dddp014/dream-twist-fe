/**
File Name : hooks/useInfiniteScroll
Description : 무한 스크롤 hook
Author : 나경윤

History
Date        Author   Status    Description
2024.07.24  나경윤    Created
*/

'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollOptions {
    onLoadMore: () => void;
}

export const useInfiniteScroll = ({ onLoadMore }: InfiniteScrollOptions) => {
    const [isPageEnd, setIsPageEnd] = useState<boolean>(false);

    const { ref, inView } = useInView({
        threshold: 0
    });

    useEffect(() => {
        if (inView && !isPageEnd) {
            onLoadMore();
        }
    }, [inView]);

    const setEnd = (end: boolean) => {
        setIsPageEnd(end);
    };

    return { ref, isPageEnd, setEnd };
};
