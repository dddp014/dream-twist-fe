/**
File Name : auth/EditProfile
Description : 프로필 수정
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function EditProfileList() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImg, setProfileImg] = useState<string>('/images/sample2.svg');
    const [Imgfile, setImgFile] = useState<File>();
    const [nickname, setNickname] = useState('경윤');

    const handleImgEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            let image = window.URL.createObjectURL(file);
            setProfileImg(image);
            setImgFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    return (
        <>
            <div
                className="relative inline-block cursor-pointer "
                onClick={handleImgEditClick}
                style={{ width: 130, height: 130 }}
            >
                <Image
                    src={profileImg}
                    alt="profile"
                    className="object-cover rounded-full border border-gray-200"
                    layout="fill"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white transition duration-200 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-25 rounded-full z-10 cursor-pointer">
                    편집
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-0"
                />
            </div>
            <div>
                <div className="flex flex-row space-x-6 mt-12 text-[1.1rem]">
                    <p className="text-gray-600">이메일</p>
                    <p className="font-normal text-gray-600">
                        aaaabbb123@gmail.com
                    </p>
                </div>
                <div className="flex flex-row space-x-6 mt-6 text-[1.1rem]">
                    <p className="text-gray-600 mt-0.5">닉네임</p>
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleInputChange}
                        className="border-b-2 border-main-200 focus:outline-none"
                    />
                </div>
            </div>
            <button className="text-[1rem] text-white bg-main rounded-lg px-5 py-1 mt-12">
                저장
            </button>
        </>
    );
}
