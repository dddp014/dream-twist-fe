/**
File Name : hooks/useModal
Description : modal 관련 기능
Author : 김민규, 임도헌

History
Date        Author   Status     Description
2024.07.24  김민규    Created   useModal 생성
2024.07.24  임도헌    Created   useEditModal생성
2024.07.27  임도헌    Modified  useEditModal파일을 useModal로 합침
2024.07.31  임도헌    Modified  함수 type 명시
*/

// hooks/useModal.ts
import { useState } from 'react';

const useModal = (initialPlot: string) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plot, setPlot] = useState(initialPlot);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const savePlot = (newPlot: string) => {
        setPlot(newPlot);
        closeModal();
    };

    return {
        isModalOpen,
        plot,
        openModal,
        closeModal,
        savePlot
    };
};

function useEditModal() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isSecondOpenModal, setIsSecondOpenModal] = useState<boolean>(false);

    const openModal = (): void => setIsOpenModal(true);
    const closeModal = (): void => setIsOpenModal(false);

    const secondOpenModal = (): void => setIsSecondOpenModal(true);
    const secondCloseModal = (): void => setIsSecondOpenModal(false);

    return {
        isOpenModal,
        openModal,
        closeModal,
        isSecondOpenModal,
        secondOpenModal,
        secondCloseModal
    };
}

export { useModal, useEditModal };
