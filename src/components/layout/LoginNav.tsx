/**
File Name : LoginNav
Description : 로그인 후 네브바
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
*/

'use client';

import Image from 'next/image';
import MyDropdown from '../auth/\bMyDropDown';
import { useDropdown } from '@/hooks/useDropdown';

export default function LoginNav() {
    const { isDropDown, dropdownRef, handleDropdown } = useDropdown();

    const profileImg = '/images/default-profile.svg';

    return (
        <div className="relative inline-block mt-2" ref={dropdownRef}>
            <button className="relative" onClick={handleDropdown}>
                <Image
                    src={profileImg}
                    alt="profile"
                    width={48}
                    height={48}
                    className="rounded-full border border-gray-200"
                />
            </button>
            {isDropDown && (
                <div className="absolute -left-8 top-full">
                    <MyDropdown />
                </div>
            )}
        </div>
    );
}
