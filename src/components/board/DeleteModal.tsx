/**
File Name : board/DeleteModal
Description : 삭제 확인 모달창
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

'use client';

import Image from 'next/image';
import Portal from '../common/Portal';
import { deleteBook, deleteComment } from '@/api/BoardApi';

interface DeleteModalProps {
    id: string;
    modalType: string;
    cancelClick: () => void;
}

export default function DeleteModal({
    id,
    modalType,
    cancelClick
}: DeleteModalProps) {
    const handleBookDelete = async () => {
        try {
            if (modalType === 'book') {
                await deleteBook(id);
                window.location.href = '/';
            }
            if (modalType === 'comment') {
                await deleteComment(id);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-10 bg-black bg-opacity-50">
                <div className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 bg-white w-96 h-fit p-4 py-8 rounded-md shadow shadow-stone-300">
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={'/images/warning.svg'}
                            alt="warning"
                            width={35}
                            height={0}
                        />
                        <p className="font-semibold text-xl my-4">
                            정말 삭제하시겠습니까?
                        </p>
                        <div className="space-x-3 mt-2">
                            <button
                                type="button"
                                onClick={handleBookDelete}
                                className="bg-red-600 text-white px-4 py-1 border rounded-md"
                            >
                                삭제
                            </button>
                            <button
                                type="button"
                                onClick={cancelClick}
                                className="bg-gray-200 text-black px-4 py-1 border rounded-md"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
