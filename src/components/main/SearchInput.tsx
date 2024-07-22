/**
File Name : main/SearchInput
Description : 입력창 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

import Image from 'next/image';
import Search from '../../images/search.svg';

export default function SearchInput() {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="동화 검색"
                className="w-[26rem] h-[3.2rem] py-3 pl-4 border border-gray-200 rounded-lg placeholder:text-base"
            />
            <button
                type="button"
                className="flex justify-center items-center absolute right-2 top-[0.47rem] w-10 h-9 bg-main rounded-md"
            >
                <Image src={Search} alt="search-icon" width={17} />
            </button>
        </div>
    );
}
