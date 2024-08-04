/**
File Name : board/EditDeleteBtn
Description : 수정/삭제 버튼 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.02  나경윤    Created
*/

'use client';

import DeleteModal from './DeleteModal';
import { useConfirmModal } from '@/hooks/useModal';

interface EditDeleteBtnProps {
    id: string;
    modalType: string;
}

export default function EditDeleteBtn({ id, modalType }: EditDeleteBtnProps) {
    const { isOpenModal, openModal, closeModal } = useConfirmModal();

    const handleDeleteClick = () => {
        openModal();
    };

    const handleCancelClick = () => {
        closeModal();
    };

    return (
        <>
            <button type="button" className="text-gray-400 text-[13px]">
                수정
            </button>
            <p className="text-gray-400 text-[12px]">ㅣ</p>
            <button
                type="button"
                className="text-gray-400 text-[13px]"
                onClick={handleDeleteClick}
            >
                삭제
            </button>
            {isOpenModal && (
                <DeleteModal
                    id={id}
                    modalType={modalType}
                    cancelClick={handleCancelClick}
                />
            )}
        </>
    );
}
