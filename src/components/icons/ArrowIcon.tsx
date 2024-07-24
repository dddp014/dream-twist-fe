/**
File Name : icons/ArrowIcon
Description : arrow 이미지 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.24  나경윤    Created
*/

'use client';

interface ArrowIconProps {
    rotate: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ rotate }) => {
    return (
        <svg
            width="23"
            height="43"
            viewBox="0 0 23 43"
            fill="none"
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <path
                d="M2 41L21 21.5L2 2"
                stroke="#A5A5A5"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
