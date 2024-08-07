/**
File Name : main/SearchBook
Description : 메인 - 동화 검색 (태그 + 제목)
Author : 나경윤

History
Date        Author   Status    Description
2024.08.06  나경윤    Created
*/

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Tag from '../common/Tag';
import SortDropdown from './SortDropdown';
import BookList from './BookList';
import { getSearchBook, getBookList } from '@/api/MainApi';
import { FairytaleInfo } from '@/types/fairytale';
import { LoadingIcon } from '../icons/LoadingIcon';
import useDebounce from '@/hooks/useDebouce';

const tags: string[] = [
    '모든 주제',
    '우화',
    '환경',
    '사랑',
    '모험',
    '추리',
    '기타'
];

export default function SearchBook() {
    const [selectedTag, setSelectedTag] = useState<string>('모든 주제');
    const [searchResults, setSearchResults] = useState<FairytaleInfo[]>([]);
    const [initData, setInitData] = useState<FairytaleInfo[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const debouncedInputValue = useDebounce(searchInputValue);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBookList();
                const formattedData = data.map((item: FairytaleInfo) => ({
                    ...item,
                    createdAt: item.createdAt.split('T')[0]
                }));
                setInitData(formattedData);
                setSearchResults(formattedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTagClick = async (label: string) => {
        setSelectedTag(label);

        if (label === '모든 주제') {
            setSearchResults(initData);
            console.log(initData);
            return;
        }

        let query = `?tags=${label}`;

        if (debouncedInputValue) {
            query += `&title=${debouncedInputValue}`;
        }

        try {
            const result = await getSearchBook(query);
            const fairytaleInfo = result.map((item: FairytaleInfo) => {
                const date = item.createdAt.split('T')[0];
                return {
                    ...item,
                    createdAt: date
                };
            });
            setSearchResults(fairytaleInfo);
        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    useEffect(() => {
        if (debouncedInputValue === '' && selectedTag === '모든 주제') {
            setSearchResults(initData);

            return;
        }

        const fetchResults = async () => {
            let query = '';
            if (debouncedInputValue && selectedTag === '모든 주제') {
                query = `?title=${debouncedInputValue}`;
            }
            if (debouncedInputValue && selectedTag !== '모든 주제') {
                query = `?tags=${selectedTag}&title=${debouncedInputValue}`;
            }

            if (debouncedInputValue === '' && selectedTag !== '모든 주제') {
                query = `?tags=${selectedTag}`;
                // console.log('??', query);
            }

            try {
                // console.log('검색 쿼리', query);
                const result = await getSearchBook(query);
                const formattedResult = result.map((item: FairytaleInfo) => ({
                    ...item,
                    createdAt: item.createdAt.split('T')[0]
                }));
                setSearchResults(formattedResult);
            } catch (error) {
                console.error(error);
                setSearchResults([]);
            }
        };

        fetchResults();
    }, [debouncedInputValue, selectedTag]);

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
                <SortDropdown />
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
