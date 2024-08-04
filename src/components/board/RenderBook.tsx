/**
File Name : board/RenderBooks
Description : 동화 게시판 - 동화책 렌더 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.30  나경윤    Created
*/

'use client';

import usePagination from '@/hooks/usePagination';
import BookViewer from './BookViewer';
import PreviewBlank from './PreviewBlank';
import Logo from '../../../public/images/logo.svg';

interface BookInfoProps {
    contents: string[];
    bookImages: string[];
}

const pageCount: number = 8;
const endImg = Logo;

export default function RenderBook({ contents, bookImages }: BookInfoProps) {
    const { step, setStep, nextStep, prevStep } = usePagination();

    const handlePreviewClick = (index: number) => {
        setStep(index);
    };

    const getTextForStep = (step: number) => {
        if (step === 0 || step === pageCount - 1) return '';
        return contents[step - 1] || '';
    };

    const getCurrentImage = (step: number): [string, string] => {
        if (step === pageCount - 1) {
            return [`url(${endImg.src})`, '30% 30%'];
        }
        return [`url(${bookImages[step]})`, '110% 110%'];
    };

    return (
        <>
            <div className="flex flex-row w-full h-3/6 justify-center items-center mb-20 mt-2">
                <BookViewer
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                />
            </div>
            <div className="flex overflow-x-scroll w-4/6 custom-scrollbar">
                <PreviewBlank
                    step={step}
                    getTextForStep={getTextForStep}
                    getCurrentImage={getCurrentImage}
                    handlePreview={handlePreviewClick}
                />
            </div>
        </>
    );
}
