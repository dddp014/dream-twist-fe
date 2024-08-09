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

const options = ['최신순', '인기순', '조회순'];

export default function SortDropdown() {
    const [label, setLabel] = useState<string>(options[0]);
    const { isDropDown, dropdownRef, handleDropdown } = useDropdown();

    const handleOptionClick = (value: string) => {
        setLabel(value);
        handleDropdown();
    };

    return (
        <div ref={dropdownRef} className="relative z-10">
            <button
                type="button"
                className="flex items-center justify-between w-[10rem] h-[3.2rem] px-6 text-left border border-gray-200 rounded-lg"
                onClick={handleDropdown}
            >
                <p>{label}</p>
                {isDropDown ? (
                    <DropIcon rotate="180" />
                ) : (
                    <DropIcon rotate="0" />
                )}
            </button>
            {isDropDown && (
                <ul className="absolute bg-white w-[10rem] h-fit text-left border border-gray-200 rounded text-base">
                    {options.map((option, index) => (
                        <li
                            key={option}
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            <button
                                type="button"
                                onClick={() => handleOptionClick(option)}
                                className="w-full text-left px-6 py-2.5"
                            >
                                {option}
                            </button>
                            {index < options.length - 1 && (
                                <hr className="border-gray-200 mx-2" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
