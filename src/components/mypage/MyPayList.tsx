/**
File Name : mypage/MyPayList
Description : 마이페이지 - 나의 결제 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
2024.08.08  김민규    Created   환불 요청 폼 
*/

'use client';

import { useEffect, useState } from 'react';
import { getMyPayList } from '@/api/MypageApi';
import Modal from '@/components/mypage/Modal';
import RefundForm from '@/components/mypage/RefundForm';

export default function MyPayList() {
    const [payInfo, setPayInfo] = useState([]);
    const [showForm, setShowForm] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyPay = async () => {
            try {
                const data = await getMyPayList();
                const payData = data.map((item) => ({
                    ...item
                }));
                setPayInfo(payData);
                console.log(payData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyPay();
    }, []);

    const handleRefund = async (paymentId: string, cancelReason: string) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log(`환불 상품 ID: ${paymentId} 환불 사유 : ${cancelReason}`);
        try {
            const response = await fetch(
                'http://localhost:4000/billing/cancel',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        id: paymentId,
                        cancelReason: cancelReason
                    })
                }
            );

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            return await response.json();
        } catch (error) {
            console.error('환불 요청 실패:', error);
            throw error;
        }
    };
    return (
        <div className="flex flex-col justify-start w-full mt-8 h-72 ">
            <div className="overflow-y-auto thin-scrollbar">
                {payInfo.length > 0 ? (
                    payInfo.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex flex-row justify-between mb-4">
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <p className="text-[1.1rem] font-medium text-main">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center text-[1.05rem] mt-0.5">
                                        <p className="">
                                            결제 금액 : {item.amount}원
                                        </p>
                                        <div className="flex flex-row items-center text-[0.9rem]">
                                            <span className="ml-2">
                                                ({item.method}
                                            </span>
                                            <span className="ml-1 ">
                                                <span> - </span>
                                                <span
                                                    className={`${item.status === 'DONE' ? 'text-blue-500' : 'text-red-500'}`}
                                                >
                                                    {item.status === 'DONE'
                                                        ? '승인'
                                                        : '취소'}
                                                </span>
                                                <span>)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-low text-right mr-6">
                                        <p className="text-[0.9rem] text-gray-400 mr-2">
                                            {item.createdAt}
                                        </p>
                                        <p
                                            className={`text-[0.9rem] ${item.isRefundable === 'T' ? 'text-blue-500' : 'text-red-500'}`}
                                        >
                                            {item.isRefundable === 'T'
                                                ? '환불 가능'
                                                : '환불 불가'}
                                        </p>
                                    </div>
                                    <div className="flex justify-end mr-5">
                                        {item.isRefundable === 'T' && (
                                            <button
                                                onClick={() =>
                                                    setShowForm(item.id)
                                                }
                                                className="btn btn-primary mt-2 px-1 rounded border border-gray-400 text-[0.85rem]"
                                            >
                                                환불 요청
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isOpen={showForm !== null}
                                onClose={() => setShowForm(null)}
                            >
                                {showForm === item.id && (
                                    <RefundForm
                                        Id={item.id}
                                        onSubmit={handleRefund}
                                        onCancel={() => setShowForm(null)}
                                    />
                                )}
                            </Modal>
                            {index < payInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-4" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-left text-gray-500">
                        결제 내역이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}
