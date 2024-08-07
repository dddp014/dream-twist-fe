// src/components/common/Modal.tsx
import { ReactNode } from 'react';
import Portal from '@/components/common/Portal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="absolute inset-0 bg-black bg-opacity-10 "
                    onClick={onClose}
                ></div>
                <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full mx-4">
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
