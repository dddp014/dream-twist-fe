/**
File Name : compoenents/book-preview/ImageModal
Description : 이미지 첨부 모달
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌   Created
2024.07.27  임도헌   Modified   portal 적용
2024.07.29  임도헌   Modified   필요없는 코드 삭제
2024.07.31  임도헌   Modified   쓸데 없는 코드 전부 삭제 및 portal 수정 및 react-hook-form으로 코드 변경
*/

import React, { useState } from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';
import FileUploadModal from './FileUploadModal';
import PaletteModal from './PaletteModal';

interface ImageModalProps {
    onClose: () => void;
    onImageSelect: (image: string) => void;
}

export default function ImageModal({
    onClose,
    onImageSelect
}: ImageModalProps) {
    const [fileUploadModalOpen, setFileUploadModalOpen] = useState(false);
    const [paletteModalOpen, setPaletteModalOpen] = useState(false);

    const handleFileUpload = (image: string) => {
        onImageSelect(image);
        setFileUploadModalOpen(false);
    };

    const handleDrawingComplete = (image: string) => {
        onImageSelect(image);
        setPaletteModalOpen(false);
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-10 bg-black bg-opacity-50">
                <div className="w-full max-w-[900px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8">
                    <button
                        onClick={() => onClose()}
                        className="ml-[800px] mt-[20px]"
                    >
                        <Image
                            src={'/images/cancleIcon.svg'}
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>
                    <p className="text-2xl font-bold mb-12">
                        이미지 생성 방식을 선택해주세요
                    </p>
                    <div className=" flex bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 mb-8 ">
                        <button
                            onClick={() => setPaletteModalOpen(true)}
                            className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg ml-10 justify-center items-center hover:bg-green-600"
                        >
                            <Image
                                src={'/images/paletteIcon.svg'}
                                width={100}
                                height={100}
                                alt="palette"
                            />
                            <p className="font-bold text-xl text-white">
                                그림판
                            </p>
                        </button>
                        <button
                            onClick={() => setFileUploadModalOpen(true)}
                            className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600"
                        >
                            <Image
                                src={'/images/pictureIcon.svg'}
                                width={100}
                                height={100}
                                alt="palette"
                            />
                            <p className="font-bold text-xl text-white">
                                사진 첨부
                            </p>
                        </button>
                        <button className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg mr-10 justify-center items-center hover:bg-green-600">
                            <Image
                                src={'/images/aiIcon.svg'}
                                width={100}
                                height={100}
                                alt="palette"
                            />
                            <p className="font-bold text-xl text-white">AI</p>
                        </button>
                    </div>

                    {fileUploadModalOpen && (
                        <FileUploadModal
                            onClose={() => setFileUploadModalOpen(false)}
                            onFileSelect={handleFileUpload}
                        />
                    )}
                    {paletteModalOpen && (
                        <PaletteModal
                            onClose={() => setPaletteModalOpen(false)}
                            onDrawingComplete={handleDrawingComplete}
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
}
