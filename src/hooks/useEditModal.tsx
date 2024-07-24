/**
File Name : hooks/useEditModal
Description : book-preview에서 사용하는 modal
Author : 임도헌

History
Date        Author   Status    Description
2024.07.24  임도헌    Created
*/

import { useState } from 'react';

export function useEditModal() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    return { isOpenModal, openModal, closeModal };
}
