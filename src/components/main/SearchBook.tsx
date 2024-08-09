/**
File Name : main/SearchBook
Description : 메인 - 동화 검색 (태그 + 제목)
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
2024.08.10  임도헌   Modified  동화 생성하다 나가고 다른 페이지 갔을 때 로컬 스토리지 비우기
*/

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Tag from '../common/Tag';
import BookList from './BookList';
import { getSearchBook } from '@/api/MainApi';
import { FairytaleInfo } from '@/types/fairytale';
import { LoadingIcon } from '../icons/LoadingIcon';
import useDebounce from '@/hooks/useDebouce';
import { useDropdown } from '@/hooks/useDropdown';
import { DropIcon } from '../icons/DropIcon';
import { removeFromLocalStorage } from '@/utils/localStorage';

const tags: string[] = [
    '모든 주제',
    '우화',
    '환경',
    '사랑',
    '모험',
    '추리',
    '기타'
];

const options: string[] = ['최신순', '인기순', '조회순'];

export default function SearchBook() {
    const [selectedTag, setSelectedTag] = useState<string>('모든 주제');
    const [searchResults, setSearchResults] = useState<FairytaleInfo[]>([]);
    const [initData, setInitData] = useState<FairytaleInfo[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [label, setLabel] = useState<string>(options[0]);
    const { isDropDown, dropdownRef, handleDropdown } = useDropdown();

    const debouncedInputValue = useDebounce(searchInputValue);

    useEffect(() => {
        removeFromLocalStorage('title');
        removeFromLocalStorage('theme');
        removeFromLocalStorage('storys');
        removeFromLocalStorage('isPublic');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let query = `?sortOrder=${label}&tags=${selectedTag}`;

            if (debouncedInputValue) {
                query += `&title=${debouncedInputValue}`;
            }

            try {
                const result = await getSearchBook(query);
                const formattedResult = result.map((item: FairytaleInfo) => ({
                    ...item,
                    createdAt: item.createdAt.split('T')[0]
                }));
                setSearchResults(formattedResult);

                if (selectedTag === '모든 주제' && debouncedInputValue === '') {
                    setInitData(formattedResult);
                }
            } catch (error) {
                console.error(error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedInputValue, selectedTag, label]);

    const handleOptionClick = (value: string) => {
        setLabel(value);
        handleDropdown();
    };

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row space-x-6">
                    {tags.map((tag) => (
                        <Tag
                            key={tag}
                            label={tag}
                            isSelected={selectedTag === tag}
                            onTagClick={() => handleTagClick(tag)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-row my-8 space-x-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchInputValue}
                        onChange={handleInputChange}
                        placeholder="동화 제목 검색"
                        className="w-[26rem] h-[3.2rem] py-3 pl-4 border border-gray-200 rounded-lg placeholder:text-base focus:outline-gray-200"
                    />
                    <button
                        type="button"
                        disabled
                        className="flex justify-center items-center absolute right-2 top-[0.47rem] w-10 h-9 bg-main rounded-md"
                    >
                        <Image
                            src="/images/search.svg"
                            alt="search-icon"
                            width={17}
                            height={0}
                        />
                    </button>
                </div>
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
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
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
            </div>
            <div className="w-full">
                {loading ? (
                    <div className="w-full flex justify-center items-center my-24">
                        <LoadingIcon />
                    </div>
                ) : searchResults.length === 0 ? (
                    <div className="flex flex-col justify-center items-center my-36">
                        <p className="text-center text-gray-500">
                            등록된 동화가 없습니다.
                        </p>
                    </div>
                ) : (
                    <BookList fairytaleInfo={searchResults} />
                )}
            </div>
        </>
    );
}
