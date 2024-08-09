/**
File Name : auth/EditProfile
Description : 프로필 수정
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
2024.08.09  임도헌   Modified  회원 탈퇴 기능 추가
*/

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    deleteAuth,
    postUserPresignedURL,
    patchProfile,
    postLogout
} from '@/api/AuthApi';
import { uploadFileToS3 } from '@/api/BookApi';

export default function EditProfileList() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImg, setProfileImg] = useState<string>('');
    const [Imgfile, setImgFile] = useState<File | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [storedName, setStoredName] = useState<string>('');
    const [storedImg, setStoredImg] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('email');
            const defaultName = localStorage.getItem('nickname');
            const defaultImg = localStorage.getItem('profileImage');

            setStoredImg(defaultImg || '');
            setStoredName(defaultName || '');
            setEmail(storedEmail);
            setNickname(defaultName || '');
            setProfileImg(defaultImg || '');
        }
    }, []);

    const UploadImageToS3 = async (file: File) => {
        try {
            const { presignedURL } = await postUserPresignedURL(file.name);
            // console.log(`Presigned URL: ${presignedURL}`);
            const fileUrl = await uploadFileToS3(presignedURL, file);
            // console.log(`파일 업로드 성공 -> s3 url: ${fileUrl}`);
            return fileUrl;
        } catch (error) {
            console.error('파일 업로드 에러:', error);
            throw error;
        }
    };

    const handleImgEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            try {
                const fileUrl = await UploadImageToS3(file);
                setProfileImg(fileUrl);
                setImgFile(file);
            } catch (error) {
                console.error('이미지 업로드 중 오류 발생:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleSaveClick = async () => {
        try {
            if (nickname === storedName && profileImg !== storedImg) {
                await patchProfile('', profileImg);
            } else if (nickname === '') {
                alert('변경할 닉네임을 입력하세요.');
            } else {
                await patchProfile(nickname, profileImg);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async () => {
        console.log('테스트');
        try {
            // 유저 삭제
            await deleteAuth(email);
            // 유저 로그아웃
            await postLogout();
            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = '/'; // 회원 탈퇴 후 메인 페이지로 리디렉션
        } catch (error) {
            console.error('회원 탈퇴 중 오류 발생:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <div
                className="relative inline-block cursor-pointer "
                onClick={handleImgEditClick}
                style={{ width: 130, height: 130 }}
            >
                {profileImg && (
                    <Image
                        src={profileImg}
                        alt="profile"
                        className="object-cover rounded-full border border-gray-200"
                        layout="fill"
                    />
                )}

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
                    <p className="font-normal text-gray-600">{email}</p>
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
            <button
                type="button"
                onClick={handleSaveClick}
                className="text-[1rem] text-white bg-main rounded-lg px-5 py-1 mt-12"
            >
                저장
            </button>
            <button
                type="button"
                onClick={handleDeleteUser}
                className="absolute bottom-4 right-6 text-gray-400 text-[0.9rem] hover:text-gray-300 z-[10]"
            >
                회원 탈퇴
            </button>
        </>
    );
}
