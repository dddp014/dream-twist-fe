/**
File Name : compoenents/book-preview/StoryModal
Description : 동화 내용 변경 모달
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌    Created
*/

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useEditModal } from '@/hooks/useEditModal';
import Image from 'next/image';

interface IStoryModalProps {
    page: number;
    story: string[];
}
interface IModalProps {
    isOpenModal: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export default function StoryModal({ page, story }: IStoryModalProps) {
    const trigger: MutableRefObject<null> = useRef(null);
    const modal: MutableRefObject<null> = useRef(null);

    const { isOpenModal, openModal, closeModal }: IModalProps = useEditModal();
    const [currentStroy, setCurrentStory] = useState<string>(story[page - 1]);

    useEffect(() => {
        setCurrentStory(story[page - 1]);
    }, [page]);

    return (
        <div>
            <button
                ref={trigger}
                onClick={() => openModal()}
                className="group relative w-full h-full flex justify-center items-center font-bold hover:opacity-60"
            >
                <div className=" w-[400px] text-lg font-bold">
                    {story[page - 1]}
                </div>
                <div className="p-2 ml-4 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                    클릭하면 내용 편집이 가능합니다.
                </div>
            </button>
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
                        <Image
                            src={'/images/cancleIcon.svg'}
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>
                    <form>
                        <p className="text-2xl font-bold mb-12">내용 편집</p>
                        <textarea
                            value={currentStroy}
                            className="flex bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 font-bold resize-none overflow-auto focus:outline-none focus:border-none"
                            onChange={(e) => {
                                setCurrentStory(e.target.value);
                            }}
                        ></textarea>
                        <div className="flex justify-end">
                            <button className="bg-main text-white font-bold rounded-lg px-4 py-2 my-4">
                                변경하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
