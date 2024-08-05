/**
File Name : board/PreviewBlank
Description : 동화 게시판 - 이미지 프리뷰 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.08.04  나경윤    Modified  동화 내용 api 연결
*/

'use client';

import { useRef, useEffect } from 'react';
import useTextToImage from '@/hooks/useTextToImage';

interface PreviewProps {
    step: number;
    getTextForStep: (step: number) => string;
    getCurrentImage: (step: number) => [string, string];
    handlePreview: (index: number) => void;
    info: string[];
}

const pageCount: number = 8;

export default function PreviewBlank({
    step,
    getTextForStep,
    getCurrentImage,
    handlePreview,
    info
}: PreviewProps) {
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const createPreviewLabel = (index: number): string => {
        if (index === 0 || index === pageCount - 1) return '커버';
        const startPage = index * 2 - 1;

        return `${startPage}-${startPage + 1}`;
    };

    const handleButtonClick = (index: number) => {
        handlePreview(index);
    };

    useEffect(() => {
        buttonRefs.current[step]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, [step]);

    const renderPreview = () => {
        return Array.from({ length: pageCount }).map((_, index) => {
            const isSelected = step === index;
            const [backgroundImage, backgroundSize] = getCurrentImage(index);
            const text = getTextForStep(index);
            const canvasRef = useTextToImage(text);
            const label = createPreviewLabel(index);

            const view =
                index === 0 || index === pageCount - 1 ? 'hidden' : 'display';
            const width =
                index === 0 || index === pageCount - 1 ? 'w-32' : 'w-64';
            const selectedStyle = isSelected
                ? 'outline outline-emerald-400 outline-4'
                : '';

            return (
                <div className="flex flex-col text-center mb-9 mt-4">
                    <div>
                        <button
                            type="button"
                            className={`hover:outline hover:outline-emerald-400 hover:outline-4 ${selectedStyle}`}
                            onClick={() => {
                                handlePreview(index);
                                handleButtonClick(index);
                            }}
                            ref={(el: HTMLButtonElement | null) => {
                                buttonRefs.current[index] = el;
                            }}
                        >
                            <div
                                key={index}
                                className={`flex flex-row ${width} h-32 overflow-hidden`}
                            >
                                <div
                                    className={`relative border-solid border border-gray-200 shadow-md w-32 h-full shadow-neutral-100 mb-3 bg-center bg-no-repeat bg-cover`}
                                    style={{
                                        backgroundImage: backgroundImage,
                                        backgroundSize: backgroundSize
                                    }}
                                >
                                    <div
                                        className={`${index === 0 ? 'display' : 'hidden'} select-none absolute bottom-0 flex flex-col justify-center items-center bg-white w-full h-[2rem]`}
                                    >
                                        <p className="text-[0.4rem] text-slate-800 font-LaundryGothic">
                                            {info[0]}
                                        </p>
                                        <p className="font-Hyemin text-slate-800 text-[0.3rem]">
                                            {info[1]} 작가
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`${view} border-solid border border-gray-200 shadow-md shadow-neutral-100 w-32 h-full pt-6 px-5`}
                                >
                                    <canvas
                                        ref={canvasRef}
                                        className="flex justify-center items-center w-full"
                                    />
                                </div>
                            </div>
                        </button>
                    </div>
                    <span className="text-sm text-stone-400 mt-2">{label}</span>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-row whitespace-nowrap space-x-6 px-1">
            {renderPreview()}
        </div>
    );
}
