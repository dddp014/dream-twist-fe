/**
File Name : auth/MyDropdown
Description : 정렬 드롭다운 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
2024.08.07  나경윤    Modified   로그아웃 연결
*/

'use client';

import { useRouter } from 'next/navigation';
import { postLogout } from '@/api/AuthApi';

const options = ['마이페이지', '로그아웃'];

export default function MyDropdown() {
    const router = useRouter();

    const handleOptionClick = async (index: number) => {
        if (index === 0) {
            router.push('/mypage');
        }
        if (index === 1) {
            try {
                await postLogout();
                window.location.href = '/';
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="z-10 bg-white">
            <ul className="bg-white w-[6.5rem] h-fit text-left border border-gray-200 rounded-sm">
                {options.map((option, index) => (
                    <li
                        key={option}
                        className="hover:bg-gray-100 cursor-pointer text-[0.9rem]"
                    >
                        <button
                            type="button"
                            className="w-full text-center py-1.5"
                            onClick={() => handleOptionClick(index)}
                        >
                            {option}
                        </button>

                        {index < options.length - 1 && (
                            <hr className="border-gray-200 mx-1" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
