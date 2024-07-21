/**
File Name : app/page
Description : 메인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Modified  메인 화면 구현
*/

import Image from 'next/image';
import TagList from '@/components/main/TagList';
import SearchInput from '@/components/main/SearchInput';
import SortDropdown from '@/components/main/SortDropdown';
import Sample1 from '../assets/images/sample1.svg';

export default function Home() {
    const bookCount: number = 10;

    return (
        <main className="flex flex-col justify-center items-center mx-24 mt-16">
            <div className="bg-main-100 h-80 w-full mb-16 rounded-xl"> </div>
            <div className="flex flex-col justify-center items-center">
                <TagList />
                <div className="flex flex-row my-8 space-x-6">
                    <SearchInput />
                    <SortDropdown />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-8 gap-y-9 my-10 z-0">
                {Array.from({ length: bookCount }).map((_, index) => (
                    <div key={index} className="relative">
                        <div className="absolute bottom-2 left-4">
                            <p className="text-lg font-semibold -mb-1">
                                뽀로로와 지구온난화
                            </p>
                            <p>김민규 작가</p>
                        </div>
                        <Image
                            src={Sample1}
                            alt="book-image"
                            className="w-[18rem] h-[25rem] border border-gray-200 rounded-xl bg-white"
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
