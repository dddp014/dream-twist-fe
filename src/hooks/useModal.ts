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
2024.08.04  나경윤    Modified  useConfirmModal 생성
*/

// hooks/useModal.ts
import { useState } from 'react';

export const useModal = (initialPlot: string) => {
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

export const useBookModal = () => {
    const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
    const [storyModalOpen, setStoryModalOpen] = useState<boolean>(false);
    const [fileUploadModalOpen, setFileUploadModalOpen] =
        useState<boolean>(false);
    const [paletteModalOpen, setPaletteModalOpen] = useState<boolean>(false);
    const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);

    return {
        imageModalOpen,
        setImageModalOpen,
        storyModalOpen,
        setStoryModalOpen,
        fileUploadModalOpen,
        setFileUploadModalOpen,
        paletteModalOpen,
        setPaletteModalOpen,
        aiModalOpen,
        setAiModalOpen
    };
};

export const useConfirmModal = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const openModal = (): void => setIsOpenModal(true);
    const closeModal = (): void => setIsOpenModal(false);

    return {
        isOpenModal,
        openModal,
        closeModal
    };
};
