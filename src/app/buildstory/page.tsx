/**
File Name : buildstory/page
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
*/


import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const BuildStoryPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="text-center py-10 w-full">
                <h1 className="text-2xl font-bold mb-4">
                    이야기를 어떻게 쓸까요?
                </h1>
                <p>AI를 활용해서 글을 쓰거나 도움없이 직접 쓸 수 있어요.</p>
            </div>

            <div className="flex flex-1">
                <div
                    className="w-1/2 bg-cover bg-left"
                    style={{
                        backgroundImage: 'url("/images/Wormis Outdoors.svg")',
                        backgroundSize: '90%',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>

                <div className="w-1/2 flex flex-col justify-center">
                    <div className="container mx-auto text-neutral-900">
                        <div className="flex flex-col">
                            <div className="bg-white p-6 rounded-lg shadow-md shadow-neutral-200 w-full h-64 text-center border border-gray-200 flex items-center">
                                <div className="flex justify-center items-center text-green-500 text-4xl my-10">
                                    <Image
                                        src="/images/note.svg"
                                        alt="toEdit"
                                        width={110}
                                        height={0}
                                        className="justify-center"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-2">
                                    직접 쓸래요
                                </h2>
                                <p className="my-4 text-center">
                                    제목도 내용도 내가 직접 써요.
                                    <br />
                                    글쓰기 능력이 쑥쑥 올라요.
                                </p>
                                <Link
                                    href="/buildstory/edit"
                                    className="bg-main text-white w-32 py-2 px-4 rounded-md my-9 block text-center"
                                >
                                    편집하기
                                </Link>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md shadow-neutral-200 w-full h-64 text-center border border-gray-200 flex items-center">
                                <div className="absolute top-0 right-4 bg-green-500 text-white pt-3 pb-2 rounded-b-lg">
                                    추천
                                </div>
                                <div className="flex justify-center items-center text-pink-300 text-4xl my-10">
                                    <Image
                                        src="/images/icon.svg"
                                        alt="withAI"
                                        width={110}
                                        height={0}
                                        className="justify-center"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-2">
                                    AI와 함께 쓸래요
                                </h2>
                                <p className="my-4 text-center">
                                    AI와 동화책의 주제글들을 만들어요.
                                    <br />
                                    AI 기술을 활용해서 글을 쓸 수 있어요.
                                </p>
                                <Link
                                    href="/buildstory/summery"
                                    className="bg-main text-white w-32 py-2 px-4 rounded-md my-9 block text-center"
                                >
                                    시작하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildStoryPage;
