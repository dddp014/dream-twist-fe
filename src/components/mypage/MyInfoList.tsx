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
import Image from 'next/image';
import { getMyPoint } from '@/api/MypageApi';

export default function MyInfoList() {
    const [myPoint, setMyPoint] = useState('0');
    const [userInfo, setUserInfo] = useState({
        nickname: localStorage.getItem('nickname') || '',
        profileImage: localStorage.getItem('profileImage') || ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyPoint();
                setMyPoint(data.userPoints);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Image
                src={userInfo.profileImage}
                alt="profile"
                width={125}
                height={0}
                className="rounded-full border border-gray-200"
            />
            <div className="flex flex-col mx-12 mt-1">
                <p className="text-[1.7rem] font-semibold">
                    안녕하세요,{' '}
                    <span className="text-main">{userInfo.nickname} </span>
                    작가님!
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
            </div>
        </>
    );
}
