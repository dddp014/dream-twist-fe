/**
File Name : main/ScrollUpButton
Description : 스크롤 맨 위로 이동 버튼
Author : 나경윤

History
Date        Author   Status    Description
2024.07.23  나경윤    Created
*/

'use client';

import Image from 'next/image';
import UpAroow from '../../images/scroll-up.svg';

export default function ScrollUpButton() {
    const handleScrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="sticky bottom-4">
            <button
                onClick={handleScrollUp}
                className="bg-main opacity-85 rounded-full py-1.5 px-1.5"
            >
                <Image src={UpAroow} alt="up-arrow" width={22} height={22} />
            </button>
        </div>
    );
}
