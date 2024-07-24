/**
File Name : hooks/useDropdown
Description : 드롭다운 hook
Author : 나경윤

History
Date        Author   Status    Description
2024.07.24  나경윤    Created
*/

'use client';

import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropDown(false);
        }
    };

    const handleDropdown = () => {
        setIsDropDown((prevIsOpen) => !prevIsOpen);
    };

    return { isDropDown, dropdownRef, handleDropdown };
};
