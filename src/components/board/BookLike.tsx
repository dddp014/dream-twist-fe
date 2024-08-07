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

export default function BookLike() {
    const likeCount = 5;
    const [likeClick, setLikeClick] = useState(false);
    const [currentCount, setCurrentCount] = useState(likeCount);

    useEffect(() => {
        setCurrentCount((prevCount) =>
            likeClick ? prevCount + 1 : prevCount - 1
        );
    }, [likeClick]);

    const handleLikeClick = () => {
        setLikeClick((prevLike) => !prevLike);
    };

    return (
        <button onClick={handleLikeClick}>
            <div className="flex flex-col items-center">
                <LikeIcon fill={likeClick ? true : false} />
                <p className="text-like text-xs -mt-1 mr-[1px]">
                    {currentCount}
                </p>
            </div>
        </button>
    );
}
