/**
File Name : main/SortDropdown
Description : 정렬 드롭다운 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

'use client';

import { useState } from 'react';
import { useDropdown } from '@/hooks/useDropdown';
import { DropIcon } from '../icons/DropIcon';

export default function SortDropdown() {
    const [label, setLabel] = useState('최신순');
    const { isDropDown, dropdownRef, handleDropdown } = useDropdown();

    return (
        <div ref={dropdownRef} className="relative z-10">
            <button
                type="button"
                className="flex items-center justify-between w-[10rem] h-[3.2rem] px-6 text-left border border-gray-200 rounded-lg"
                onClick={handleDropdown}
            >
                <p>{label}</p>
                {isDropDown ? (
                    <DropIcon rotate="0" />
                ) : (
                    <DropIcon rotate="180" />
                )}
            </button>
            {isDropDown && (
                <ul className="absolute bg-white w-[10rem] h-fit text-left border border-gray-200 rounded text-base">
                    <div>
                        <li className="hover:bg-gray-100 cursor-pointer">
                            <button
                                type="button"
                                onClick={() => {
                                    setLabel('최신순');
                                    handleDropdown();
                                }}
                                className="w-full text-left px-6 py-2.5"
                            >
                                최신순
                            </button>
                        </li>
                        <hr className="border-gray-200 mx-2" />
                        <li className="hover:bg-gray-100 cursor-pointer">
                            <button
                                type="button"
                                onClick={() => {
                                    setLabel('인기순');
                                    handleDropdown();
                                }}
                                className="w-full text-left px-6 py-2.5"
                            >
                                인기순
                            </button>
                        </li>
                    </div>
                </ul>
            )}
        </div>
    );
}
