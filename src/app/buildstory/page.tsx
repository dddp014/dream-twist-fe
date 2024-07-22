/**
File Name : buildstory/page
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
*/

'use client';

import Link from 'next/link';
import Step1 from '@/components/step1';
import Step2 from '@/components/step2';
import Step3 from '@/components/step3';
import ToEdit from '@/images/to-edit.svg';
import WithAI from '@/images/with-ai.svg';
import Image from 'next/image';
import { useState } from 'react';

function BuildStoryPage() {
    const [step, setStep] = useState(0); // 0은 초기 화면, 1은 Step1 화면

    const handleStartClick = () => {
        setStep(1);
    };

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div>
            <div className="py-10">
                <div className="container mx-auto">
                    {step === 0 ? (
                        <>
                            <h1 className="text-2xl font-bold text-center mb-4">
                                이야기를 어떻게 쓸까요?
                            </h1>
                            <div className="text-center mb-10">
                                AI를 활용해서 글을 쓰거나 도움없이 직접 쓸 수
                                있어요.
                            </div>
                            <div className="flex justify-center gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center border-2 border-green-500 relative">
                                    <div className="flex justify-center items-center text-green-500 text-4xl my-10">
                                        <Image
                                            src={ToEdit}
                                            alt="toEdit"
                                            width={110}
                                            className="justify-center"
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">
                                        직접 쓸래요
                                    </h2>
                                    <p className="mt-4">
                                        제목도 내용도 내가 직접 써요.
                                        <br />
                                        글쓰기 능력이 쑥쑥 올라요.
                                    </p>
                                    <button className="bg-main text-white py-2 px-4 rounded my-8">
                                        글 편집 단계로
                                    </button>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center border-2 border-green-500 relative">
                                    <div className="absolute top-0 right-0 m-4 bg-green-500 text-white py-1 px-2 rounded-full">
                                        추천
                                    </div>
                                    <div className="flex justify-center items-center text-pink-300 text-4xl my-10">
                                        <Image
                                            src={WithAI}
                                            alt="withAI"
                                            width={110}
                                            className="justify-center"
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">
                                        AI와 함께 쓸래요
                                    </h2>
                                    <p className="mt-4">
                                        AI와 동화책의 주제글들을 만들어요.
                                        <br />
                                        AI 기술을 활용해서 글을 쓸 수 있어요.
                                    </p>
                                    <button
                                        className="bg-pink-400 text-white py-2 px-4 rounded my-8"
                                        onClick={handleStartClick}
                                    >
                                        시작하기
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : step === 1 ? (
                        <Step1 nextStep={nextStep} />
                    ) : step === 2 ? (
                        <Step2 nextStep={nextStep} prevStep={prevStep} />
                    ) : step === 3 ? (
                        <Step3 prevStep={prevStep} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
export default BuildStoryPage;
