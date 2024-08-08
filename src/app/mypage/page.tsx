/**
File Name : mypage/page
Description : 마이페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MyBookList from '@/components/mypage/MyBookList';
import MyCommentList from '@/components/mypage/MyCommentList';
import { getMyPayList } from '@/api/MypageApi';
import { dummyMyComments } from '@/utils/dummyBooks';
import { payInfo } from '@/types/mypage';
import MyPayList from '@/components/mypage/MyPayList';
import MyInfoList from '@/components/mypage/MyInfoList';
import LikeBookList from '@/components/mypage/LikeBookList';

export const metadata: Metadata = {
    title: '꿈틀 마이페이지',
    description: '나의 동화 목록과 정보를 확인하세요.'
};

export default async function Mypage() {
    const myCommentInfo = dummyMyComments.map((item) => {
        return { ...item };
    });

    let payData = [];

    try {
        payData = await getMyPayList('2');
    } catch (error) {
        console.error(error);
    }

    const payInfo = payData.map((item: payInfo) => {
        return {
            ...item
        };
    });

    // console.log(payData);

    return (
        <div className="flex flex-col justify-center items-center mx-24 mt-16 mb-7">
            <div className="bg-main-100 h-64 w-full mb-16 rounded-xl flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-44">
                <div className="flex flex-row">
                    <MyInfoList />
                </div>
                <div className="flex flex-row text-lg justify-center items-center ml-28 mt-16">
                    <div className="w-px h-14 bg-main mr-5" />
                    <div className="flex flex-col">
                        <Link href={'/edit-profile'}>
                            <div className="flex flex-row">
                                <Image
                                    src={'/images/profile.svg'}
                                    alt="profile-edit"
                                    width={22}
                                    height={0}
                                />

                                <p className="ml-3 mb-0.5 hover:text-main">
                                    프로필 수정
                                </p>
                            </div>
                        </Link>
                        <Link href={'/payments'}>
                            <div className="flex flex-row">
                                <Image
                                    src={'/images/credit.svg'}
                                    alt="profile-edit"
                                    width={22}
                                    height={0}
                                />
                                <p className="ml-3 hover:text-main">
                                    나뭇잎 충전
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col self-start mb-16 w-full">
                <p className="text-[1.3rem] font-semibold">나의 동화</p>
                <MyBookList />
                <p className="text-[1.3rem] font-semibold mt-16">
                    좋아요한 동화
                </p>
                <LikeBookList />
                <div className="flex flex-row w-full space-x-20 mt-6">
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.3rem] font-semibold mt-16">
                            나의 댓글
                        </p>
                        <MyCommentList commentInfo={myCommentInfo} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-[1.3rem] font-semibold mt-16">
                            나의 결제 내역
                        </p>
                        <MyPayList payInfo={payInfo} />
                    </div>
                </div>
            </div>
        </div>
    );
}
