/**
File Name : useNumPagination
Description : 페이지네이션 훅
Author : 나경윤

History
Date        Author   Status    Description
2024.08.09  나경윤    Created
*/

'use client';

import { useState, useMemo } from 'react';

interface UsePaginationProps {
    totalPages: number;
    maxVisiblePages?: number;
}

const usePagination = ({
    totalPages,
    maxVisiblePages = 5
}: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지 번호 생성
    const pages = useMemo(() => {
        const total = Math.min(totalPages, maxVisiblePages);
        const startPage = Math.max(1, currentPage - Math.floor(total / 2));
        const endPage = Math.min(totalPages, startPage + total - 1);

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    }, [currentPage, totalPages, maxVisiblePages]);

    // 현재 페이지가 첫 페이지면 이전 버튼 비활
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handleStartClick = () => setCurrentPage(1);
    const handleEndClick = () => setCurrentPage(totalPages);
    const handleNextClick = () =>
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    const handlePrevClick = () =>
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return {
        currentPage,
        pages,
        isFirstPage,
        isLastPage,
        handleStartClick,
        handleEndClick,
        handleNextClick,
        handlePrevClick,
        setCurrentPage
    };
};

export default usePagination;
