/**
File Name : MainBanner
Description : 메인 배너
Author : 나경윤

History
Date        Author   Status    Description
2024.08.08  나경윤    Created
*/

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MainBannero() {
    const [imageUrl, setImageUrl] = useState('/images/main1.png');
    return (
        <div
            className="flex items-center justify-center relative bg-main-100 h-80 w-full mb-16 rounded-xl overflow-hidden"
            onMouseEnter={() => setImageUrl('/images/main2.png')}
            onMouseLeave={() => setImageUrl('/images/main1.png')}
        >
            <div className="absolute flex flex-row items-center justify-center">
                <Image
                    src={'/images/main3.png'}
                    alt="main-img"
                    width={700}
                    height={0}
                    className="ml-[17rem] -mr-24"
                />

                <Image
                    src={imageUrl}
                    alt="main-img"
                    width={430}
                    height={0}
                    className="mt-20 mr-72"
                />
            </div>
        </div>
    );
}
