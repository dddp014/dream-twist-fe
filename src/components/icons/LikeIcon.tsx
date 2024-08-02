/**
File Name : icons/LikeIcon
Description : 좋아요 이미지 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.01  나경윤    Created
*/

'use client';

interface LikeIconProps {
    fill: boolean;
}

export const LikeIcon = ({ fill = false }: LikeIconProps) => {
    return (
        <svg
            width="27"
            height="28"
            viewBox="-1 0 38 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M29.9018 2.77624C32.8922 5.80745 33.706 11.1352 30.1667 14.7436L16.5104 27.3203L2.85407 14.7436C-0.711614 11.1085 0.104473 5.78097 3.09922 2.75762C4.5859 1.25674 6.5859 0.354937 8.81627 0.519244C11.0471 0.683585 13.5875 1.92099 16.1327 4.85496C16.2276 4.96443 16.3654 5.02732 16.5104 5.02732C16.6553 5.02732 16.7931 4.96443 16.8881 4.85496C19.4333 1.92092 21.9703 0.687083 24.1966 0.526555C26.4224 0.36606 28.4178 1.272 29.9018 2.77624Z"
                stroke="#ff3672"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill={fill ? '#ff3672' : 'none'}
            />
        </svg>
    );
};
