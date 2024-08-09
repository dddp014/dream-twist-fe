/**
File Name : common/Toggle
Description : 토글 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.23  임도헌   Created
2024.07.23  임도헌   Modified  토클 컴포넌트 생성
2024.07.25  임도헌   Modified  폼 형식 받아올 수 있게 수정
2024.07.31  임도헌   Modified  FairytailForm과 Book컴포넌트 연동할 수 있도록 코드 변경
*/

import React from 'react';

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {
    return (
        <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
            <input
                type="checkbox"
                className="sr-only"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            {/* Custom Slider */}
            <span
                className={`slider mr-3 flex h-[26px] w-[90px] items-center rounded-full p-1 duration-200 ${
                    value ? 'bg-main' : 'bg-[#CCCCCE]'
                }`}
            >
                <span
                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                        value ? 'translate-x-6' : ''
                    }`}
                ></span>
            </span>
            {/* Label */}
            <span className="w-full label flex items-center text-sm font-medium text-black">
                <span className="pl-1">{value ? '' : '비'}</span>
                공개
            </span>
            {/* Hidden Checkbox */}
        </label>
    );
}
