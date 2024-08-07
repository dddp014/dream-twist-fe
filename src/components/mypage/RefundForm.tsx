import { useState } from 'react';

interface RefundFormProps {
    Id: string;
    onSubmit: (Id: string, cancelReason: string) => void;
    onCancel: () => void;
}

const reasons = ['가격이 너무 비싸요', '동화를 만들기 싫어졌어요', '기타 사유'];

const RefundForm: React.FC<RefundFormProps> = ({ Id, onSubmit, onCancel }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const handleSubmit = () => {
        const reason =
            selectedReason === '기타 사유' ? otherReason : selectedReason;
        onSubmit(Id, reason);
        setSelectedReason('');
        setOtherReason('');
        onCancel();
    };

    return (
        <div className="refund-form">
            <div className="mb-4">
                <label htmlFor="reason" className="block mb-2">
                    환불 사유 선택
                </label>
                <select
                    id="reason"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled>
                        환불 사유를 선택해주세요
                    </option>
                    {reasons.map((reason) => (
                        <option key={reason} value={reason}>
                            {reason}
                        </option>
                    ))}
                </select>
            </div>
            {selectedReason === '기타 사유' && (
                <div className="mb-4">
                    <label htmlFor="otherReason" className="block mb-2">
                        기타 사유
                    </label>
                    <textarea
                        id="otherReason"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="기타 사유를 입력해주세요"
                        className="w-full p-2 border rounded"
                    />
                </div>
            )}
            <div className="flex justify-end mt-2">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary text-white bg-main py-2 px-4 rounded"
                >
                    환불 요청
                </button>
                <button
                    onClick={onCancel}
                    className="btn btn-secondary ml-2 text-white bg-gray-400 py-2 px-4 rounded"
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default RefundForm;
