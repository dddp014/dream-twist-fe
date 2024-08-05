/**
File Name : mypage/edit-profile
Description : 마이페이지 - 프로필 편집
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

import Image from 'next/image';

export default function EditProfile() {
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="flex flex-col justify-center items-center bg-white w-[40rem] h-[33rem] rounded-xl shadow-lg border border-gray-100 shadow-gray-200">
                <p className="text-main font-semibold text-[1.5rem] mb-12">
                    프로필 수정
                </p>
                <Image
                    src={'/images/sample2.svg'}
                    alt="profile"
                    width={130}
                    height={0}
                    className="rounded-full overflow-hidden border border-gray-200"
                />
                <div>
                    <div className="flex flex-row space-x-6 mt-12 text-[1.1rem]">
                        <p className="text-gray-600">이메일</p>
                        <p className="font-normal">aaaabbb123@gmail.com</p>
                    </div>
                    <div className="flex flex-row space-x-6 mt-6 text-[1.1rem]">
                        <p className="text-gray-600 mt-0.5">닉네임</p>
                        <input
                            type="text"
                            defaultValue="경윤"
                            className="border-b-2 border-main focus:outline-none"
                        />
                    </div>
                </div>
                <button className="text-[1rem] text-white bg-main rounded-lg px-5 py-1 mt-12">
                    저장
                </button>
            </div>
        </div>
    );
}
