/**
File Name : mypage/edit-profile
Description : 마이페이지 - 프로필 편집
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

import EditProfileList from '@/components/auth/EditProfileList';

export default function EditProfile() {
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="relative flex flex-col justify-center items-center bg-white w-[40rem] h-[35rem] rounded-xl shadow-lg border border-gray-100 shadow-gray-200">
                <p className="text-main font-semibold text-[1.6rem] mb-12 -mt-6">
                    프로필 수정
                </p>
                <EditProfileList />
                <button className="absolute bottom-4 right-6 text-gray-400 text-[0.9rem] hover:text-gray-300">
                    회원 탈퇴
                </button>
            </div>
        </div>
    );
}
