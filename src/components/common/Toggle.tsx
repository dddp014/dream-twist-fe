/**
File Name : common/Toggle
Description : 토글 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.23  임도헌    Created
*/

import { useState } from 'react';

const Toggle = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
                <input
                    type="checkbox"
                    name="autoSaver"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={`slider mr-3 flex h-[26px] w-[90px] items-center rounded-full p-1 duration-200 ${
                        isChecked ? 'bg-main' : 'bg-[#CCCCCE]'
                    }`}
                >
                    <span
                        className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                            isChecked ? 'translate-x-6' : ''
                        }`}
                    ></span>
                </span>
                <span className="w-full label flex items-center text-sm font-medium text-black">
                    <span className="pl-1"> {isChecked ? '' : '비'} </span>
                    공개
                </span>
            </label>
        </>
    );
};

export default Toggle;
