/**
File Name : mypage/MyInfoList
Description : 마이페이지 - 정보 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
*/

'use client';

import { useEffect, useState } from 'react';
import { getMyPoint } from '@/api/MypageApi';

export default function MyInfoList() {
    const [myPoint, setMyPoint] = useState('0');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyPoint();
                console.log(data.userPoints);
                setMyPoint(data.userPoints);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <p className="text-[1.7rem] font-semibold">
                안녕하세요, <span className="text-main">민규</span> 작가님!
            </p>
            <div className="flex flex-row space-x-7 justify-center items-center mt-5">
                <div className="flex flex-col justify-center items-center text-lg">
                    <p className="font-medium">내 동화</p>
                    <p className="text-main font-semibold">3권</p>
                </div>
                <div className="w-px h-14 bg-gray-300" />
                <div className="flex flex-col justify-center items-center text-lg">
                    <p className="font-medium">받은 좋아요</p>
                    <p className="text-main font-semibold">356</p>
                </div>
                <div className="w-px h-14 bg-gray-300" />
                <div className="flex flex-col justify-center items-center text-lg">
                    <p className="font-medium">내 나뭇잎</p>
                    <p className="text-main font-semibold">{myPoint}</p>
                </div>
            </div>
        </>
    );
}
