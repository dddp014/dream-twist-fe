/**
File Name : compoenents/book-preview/ImageModal
Description : 이미지 첨부 모달
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌    Created
*/

import bookCover from '../../assets/images/book-image.svg';
import paletteIcon from '../../assets/images/paletteIcon.svg';
import aiIcon from '../../assets/images/aiIcon.svg';
import pictureIcon from '../../assets/images/pictureIcon.svg';
import Image from 'next/image';
import selectImageIcon from '../../assets/images/BiImageAlt.svg';
import cancleIcon from '../../assets/images/cancleIcon.svg';
import { MutableRefObject, useRef } from 'react';
import { useModal } from '@/hooks/useModal';

interface IModalProps {
    isOpenModal: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export default function ImageModal({
    page,
    width
}: {
    page: number;
    width: number;
}) {
    const trigger: MutableRefObject<null> = useRef(null);
    const modal: MutableRefObject<null> = useRef(null);

    const { isOpenModal, openModal, closeModal }: IModalProps = useModal();

    return (
        <div>
            {bookCover && page === 0 ? (
                <button
                    ref={trigger}
                    onClick={() => openModal()}
                    className={`flex justify-center items-center group relative w-[${width}px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60`}
                >
                    <Image src={bookCover} width={width} alt="bookCover" />
                    <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                        클릭하면 이미지 생성이 가능합니다.
                    </div>
                </button>
            ) : (
                <button
                    ref={trigger}
                    onClick={() => openModal()}
                    className="group relative w-[300px] h-[300px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60"
                >
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={selectImageIcon}
                            width={width}
                            alt="selectImage"
                        />
                        <p>클릭해서 이미지 생성</p>
                    </div>
                    <div className="p-2 ml-4 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                        클릭하면 이미지 생성이 가능합니다.
                    </div>
                </button>
            )}

            <div
                className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-10 ${
                    isOpenModal ? 'block' : 'hidden'
                }`}
            >
                <div
                    ref={modal}
                    onFocus={() => openModal()}
                    onBlur={() => closeModal()}
                    className="w-full max-w-[900px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8 "
                >
                    <button
                        onClick={() => closeModal()}
                        className="ml-[800px] mt-[20px]"
                    >
                        <Image src={cancleIcon} alt="cancle" />
                    </button>

                    <p className="text-2xl font-bold mb-12">
                        이미지 생성 방식을 선택해주세요
                    </p>
                    <div className=" flex bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 mb-8 ">
                        <button className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg ml-10 justify-center items-center hover:bg-green-600">
                            <Image src={paletteIcon} alt="palette" />
                            <p className="font-bold text-xl text-white">
                                그림판
                            </p>
                        </button>
                        <button className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600">
                            <Image src={pictureIcon} alt="palette" />
                            <p className="font-bold text-xl text-white">
                                사진 첨부
                            </p>
                        </button>
                        <button className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg mr-10 justify-center items-center hover:bg-green-600">
                            <Image src={aiIcon} alt="palette" />
                            <p className="font-bold text-xl text-white">AI</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
