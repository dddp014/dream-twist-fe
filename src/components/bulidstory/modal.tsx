// components/Modal.js
import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newPlot: string) => void;
    currentPlot: string;
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSave,
    currentPlot
}) => {
    const [newPlot, setNewPlot] = React.useState(currentPlot);

    React.useEffect(() => {
        setNewPlot(currentPlot);
    }, [currentPlot]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                    바꾸고 싶은 내용을 적으면 AI가 줄거리를 수정합니다.
                </h2>
                <textarea
                    value={newPlot}
                    onChange={(e) => setNewPlot(e.target.value)}
                    className="w-full h-40 p-4 border rounded-md mb-4"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    >
                        닫기
                    </button>
                    <button
                        onClick={() => onSave(newPlot)}
                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                        생성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
