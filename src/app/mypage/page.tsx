/**
File Name : mypage/page
Description : 마이페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

import Image from 'next/image';

export default function Mypage() {
    return (
        <div className="flex flex-col justify-center items-center mx-24 mt-16">
            <div className="bg-main-100 h-64 w-full mb-16 rounded-xl px-44 flex justify-center items-center">
                <div className="flex flex-row ">
                    <Image
                        src={'/images/default-profile.svg'}
                        alt="profile"
                        width={125}
                        height={0}
                    />
                    <div className="flex flex-col mx-12 mt-1">
                        <p className="text-[1.7rem] font-semibold">
                            안녕하세요, <span className="text-main">민규</span>{' '}
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
                                <p className="font-medium">이용권</p>
                                <p className="text-main font-semibold">1개월</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row text-lg justify-center items-center ml-28 mt-16">
                    <div className="w-px h-14 bg-main mr-5" />
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <Image
                                src={'/images/profile.svg'}
                                alt="profile-edit"
                                width={22}
                                height={0}
                            />
                            <p className="ml-3 mb-0.5">프로필 수정</p>
                        </div>
                        <div className="flex flex-row">
                            <Image
                                src={'/images/credit.svg'}
                                alt="profile-edit"
                                width={22}
                                height={0}
                            />
                            <p className="ml-3 mb-0.5">이용권 구매</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col self-start mb-16">
                <p className="text-[1.3rem] font-semibold mb-4">나의 동화</p>
                <button className="border rounded-lg bg-gray-200 w-52 h-64"></button>
                <p className="text-[1.3rem] font-semibold mb-4 mt-16">
                    좋아요한 동화
                </p>
                <button className="border rounded-lg bg-gray-200 w-52 h-64"></button>
            </div>
        </div>
    );
}
