/**
File Name : board/BookViewer
Description : 동화 게시판 - 동화 뷰어 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.21  나경윤    Modified  페이지 구분 추가
*/

'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextArrow from '../../assets/images/next-arrow.svg';
import PrevArrow from '../../assets/images/prev-arrow.svg';
import Sample1 from '../../assets/images/sample1.svg';
import Sample2 from '../../assets/images/sample2.svg';

export default function BookViewer() {
    const sampleImages = [Sample1, Sample2, Sample1, Sample2, Sample1, Sample2];
    const pageCount: number = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const renderBookImages = () => {
        return sampleImages.map((img, index) => ({
            id: index + 1,
            backgroundImage: `url(${img.src})`
        }));
    };

    const renderBooks = () => {
        const books = renderBookImages();
        const currentBook = books.find((book) => book.id === currentPage);

        if (!currentBook) {
            return null;
        }

        const view =
            currentPage === 1 || currentPage === pageCount
                ? 'hidden'
                : 'display';
        const width =
            currentPage === 1 || currentPage === pageCount
                ? 'w-4/12'
                : 'w-8/12';

        return (
            <div
                key={currentBook.id}
                className={`flex felx-row justify-center items-center ${width} h-[110%] ml-14 hover:perspective-1600`}
            >
                <div
                    className="border-solid border border-gray-100 bg-[length:100%_100%] w-full h-full bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{ backgroundImage: currentBook.backgroundImage }}
                >
                    {' '}
                </div>
                <div
                    className={`${view} flex justify-center items-center border-solid border border-gray-100 w-full h-full bg-[length:100%_100%] bg-cover bg-center bg-no-repeat shadow-lg`}
                >
                    <p>줄거리</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-row w-full h-3/6 justify-center items-center mb-10">
            {currentPage > 1 && (
                <button type="button" onClick={handlePrevPage}>
                    <Image src={PrevArrow} alt="prev-arrow" />
                </button>
            )}
            {renderBooks()}
            {currentPage < pageCount && (
                <button
                    type="button"
                    onClick={handleNextPage}
                    className="ml-12"
                >
                    <Image src={NextArrow} alt="next-arrow" />
                </button>
            )}
        </div>
    );
}
