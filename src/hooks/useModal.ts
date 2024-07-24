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

export default useModal;
