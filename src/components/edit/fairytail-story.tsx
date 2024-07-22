/**
File Name : components/edit/fairytail-story
Description : 동화 내용 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
*/
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FairytailStory() {
    const [isClick, setIsClick] = useState(0);
    const value =
        '내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 ';

    const handleClick = (idx: number) => {
        setIsClick(idx);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <form
            action=""
            onSubmit={handleSubmit}
            className="w-8/12 m-4 mt-24 p-2 pl-1 border border-green-300 rounded-lg shadow"
        >
            <div className="flex justify-end">
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
                rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                peer-checked:bg-green-600"
                    ></div>
                    <span className="ms-3 text-sm font-medium">공개 여부</span>
                </label>
                <button className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base">
                    저장
                </button>
                <Link
                    href={''}
                    className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base"
                >
                    다음 단계
                </Link>
            </div>
            <div
                key={0}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 0 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(0);
                }}
            >
                <p className="w-full text-3xl font-bold">01</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300 m"></div>
                <textarea
                    required
                    name="story-0"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 0 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={1}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 1 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(1);
                }}
            >
                <p className="text-3xl font-bold">02</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-1"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 1 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={2}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 2 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(2);
                }}
            >
                <p className="text-3xl font-bold">03</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-2"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 2 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={3}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 3 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(3);
                }}
            >
                <p className="text-3xl font-bold">04</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-3"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 3 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
        </form>
    );
}
