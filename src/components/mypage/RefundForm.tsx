/**
File Name : mypage/RefundForm
Description : 마이페이지 - 나의 결제 리스트
Author : 김민규

History
Date        Author   Status    Description
2024.08.08  김민규    Created   환불 요청 폼 
*/

import { useState } from 'react';

interface RefundFormProps {
    Id: string;
    onSubmit: (Id: string, cancelReason: string) => void;
    onCancel: () => void;
}

const reasons = [
    '생성된 동화가 기대에 미치지 않아요.',
    '결제 금액이 잘못되었어요.',
    '결제 후 서비스가 불편하여 사용을 중단하고 싶어요',
    '의도하지 않은 결제가 이루어졌어요',
    '기타 사유'
];

const RefundForm: React.FC<RefundFormProps> = ({ Id, onSubmit, onCancel }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const handleSubmit = () => {
        const reason =
            selectedReason === '기타 사유' ? otherReason : selectedReason;

        if (!reason) {
            alert('환불사유를 선택하세요.');
        } else {
            onSubmit(Id, reason);
            setSelectedReason('');
            setOtherReason('');
            window.location.href = '/mypage';
        }

        // onCancel();
    };

    return (
        <div className="refund-form">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">꿈틀의 환불 규정</h2>
                <ul className="list-disc pl-5 text-sm">
                    <li>
                        구매 후 15일 이내 환불 요청 시 전액 환불이 가능합니다.
                    </li>
                    <li>사용한 포인트에 대해서는 환불이 불가합니다.</li>
                    <li>
                        동화 생성에 기술적 문제가 있는 경우, 검토 후 환불이
                        진행됩니다.
                    </li>
                    <li>결제 후 15일이 지난 경우 환불이 불가합니다.</li>
                </ul>
            </div>
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
