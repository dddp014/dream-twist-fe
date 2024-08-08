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

export default function BookLike(likeCount: any) {
    const [likeClick, setLikeClick] = useState(false);
    const [currentCount, setCurrentCount] = useState(likeCount);

    const handleLikeClick = () => {
        const newLikeClick = !likeClick;
        setLikeClick(newLikeClick);
        setCurrentCount((prevCount: any) =>
            newLikeClick ? prevCount + 1 : prevCount - 1
        );
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
