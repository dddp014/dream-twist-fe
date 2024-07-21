/**
File Name : main/SortDropdown
Description : 정렬 드롭다운 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DropDown from '../../assets/images/dropdown.svg';
import DropUp from '../../assets/images/dropup.svg';

export default function SortDropdown() {
    const [isDropDown, setIsDropDown] = useState(false);
    const [label, setLabel] = useState('최신순');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropDown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <button
                type="button"
                className="flex items-center justify-between w-[10rem] h-[3.2rem] px-6 text-left border border-gray-200 rounded-lg"
                onClick={() => setIsDropDown(!isDropDown)}
            >
                <p>{label}</p>
                <Image
                    src={isDropDown ? DropUp : DropDown}
                    alt="drop-icon"
                    width={13}
                />
            </button>
            {isDropDown && (
                <ul className="w-[10rem] h-fit text-left border border-gray-200 rounded text-base">
                    <div>
                        <li className="hover:bg-gray-100 cursor-pointer">
                            <button
                                type="button"
                                onClick={() => {
                                    setLabel('최신순');
                                    setIsDropDown(false);
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
                                    setIsDropDown(false);
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
