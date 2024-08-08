/**
File Name : board/BookLike
Description : 게시판 좋아요 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

'use client';

import { useState, useEffect } from 'react';
import { LikeIcon } from '../icons/LikeIcon';
import { postBookLike } from '@/api/BoardApi';

interface BookLikeProps {
    id: string;
    likeCount: string;
    mybooks: string[];
}

export default function BookLike({ id, likeCount, mybooks }: BookLikeProps) {
    const [likeClick, setLikeClick] = useState(false);
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(() => {
        setCurrentCount(Number(likeCount));
    }, [likeCount]);

    useEffect(() => {
        if (mybooks.map(String).includes(id)) {
            setLikeClick(true);
        }
    }, [mybooks, id]);

    const handleLikeClick = async () => {
        const newLikeClick = !likeClick;
        setLikeClick(newLikeClick);
        setCurrentCount((prevCount: any) =>
            newLikeClick ? prevCount + 1 : prevCount - 1
        );

        try {
            // 좋아요 상태 변경 요청
            await postBookLike(id);
            // console.log('좋아요', id);
        } catch (error) {
            // 요청 실패 시 상태를 원래대로 복원
            setLikeClick(likeClick);
            setCurrentCount((prevCount) =>
                newLikeClick ? prevCount - 1 : prevCount + 1
            );
            console.error('좋아요 요청 실패:', error);
        }
    };

    return (
        <button type="button" onClick={handleLikeClick}>
            <div className="flex flex-col items-center">
                <LikeIcon fill={likeClick} />
                <p className="text-like text-xs -mt-1 mr-[1px]">
                    {currentCount}
                </p>
            </div>
        </button>
    );
}
