/**
File Name : buildstory/page
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
2024.07.28  김민규    Modified   container로 분리
*/

// import React from 'react';
// import BuildStoryContainer from '@/containers/BuildStoryContainer';

// const BuildStoryPage = () => {
//   return <BuildStoryContainer />;
// };

// export default BuildStoryPage;

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const BuildStoryPage: React.FC = () => {
    // const handleEditClick = () => {
    //     // 직접 쓰기 클릭 시의 처리
    //     // 여기서 setStep 또는 다른 state를 변경하여 다른 페이지로 이동 가능
    //     console.log('직접 쓰기 클릭됨');
    // };

    // const handleStartClick = () => {
    //     // AI와 함께 쓰기 클릭 시의 처리
    //     // 여기서 setStep 또는 다른 state를 변경하여 다른 페이지로 이동 가능
    //     console.log('AI와 함께 쓰기 클릭됨');
    // };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="py-10 flex-1 overflow-y-auto">
                <div className="container mx-auto mt-10 text-neutral-900">
                    <>
                        <h1 className="text-2xl font-bold text-center mb-4">
                            이야기를 어떻게 쓸까요?
                        </h1>
                        <div className="text-center mb-12">
                            AI를 활용해서 글을 쓰거나 도움없이 직접 쓸 수
                            있어요.
                        </div>
                        <div className="flex justify-center gap-8 mb-15">
                            <div className="bg-white p-6 rounded-lg shadow-md shadow-neutral-200 w-96 max-w-xs md:max-w-md lg:max-w-lg text-center border border-gray-200 relative flex flex-col items-center">
                                <div className="flex justify-center items-center text-green-500 text-4xl my-10">
                                    <Image
                                        src="/images/to-edit.svg"
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
                                <button
                                    className="bg-main text-white w-32 py-2 px-4 rounded-md my-9"
                                    // onClick={handleEditClick}
                                >
                                    편집하기
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md shadow-neutral-200 w-96 max-w-xs md:max-w-md lg:max-w-lg text-center border border-gray-200 relative flex flex-col items-center">
                                <div className="absolute top-0 right-4 bg-green-500 text-white pt-3 pb-2 px-2 rounded-b-lg">
                                    추천
                                </div>
                                <div className="flex justify-center items-center text-pink-300 text-4xl my-10">
                                    <Image
                                        src="/images/with-ai.svg"
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
                    </>
                </div>
            </div>
        </div>
    );
};

export default BuildStoryPage;
