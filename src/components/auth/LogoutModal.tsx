// components/auth/LogoutModal.tsx

'use client';

import React from 'react';
import Portal from '@/components/common/Portal';

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
    isOpen,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-md text-center max-w-[20rem] w-full">
                    <h2 className="mb-4 text-lg font-semibold">로그아웃</h2>
                    <p className="mb-6">정말 로그아웃 하시겠습니까?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="bg-red-500 text-white py-2 px-4 rounded-md"
                        >
                            확인
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default LogoutModal;
