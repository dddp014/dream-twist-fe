/**
File Name : board/BookLike
Description : 게시판 좋아요 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

'use client';

import { useState } from 'react';
import { LikeIcon } from '../icons/LikeIcon';

export default function BookLike() {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLikeClick = () => {
        setLike((prevLike) => {
            const newLike = !prevLike;
            setLikeCount((prevCount) => prevCount + (newLike ? 1 : -1));
            return newLike;
        });
    };

    return (
        <button onClick={handleLikeClick}>
            <div className="flex flex-col items-center">
                <LikeIcon fill={like ? true : false} />
                <p className="text-like text-xs -mt-1 mr-[1px]">{likeCount}</p>
            </div>
        </button>
    );
}
