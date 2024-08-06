/**
File Name : app/payments/complete
Description : 결제완료 페이지
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/

'use client';

import { notFound } from 'next/navigation';
import { FC, useEffect } from 'react';
import Link from 'next/link';

interface PaymentPageProps {
    searchParams: {
        amount: number;
        orderId: string;
        paymentKey: string;
    };
}

const PaymentCompletePage: FC<PaymentPageProps> = ({ searchParams }) => {
    if (!searchParams.orderId) {
        notFound();
        return null; // 리다이렉션 이후에는 컴포넌트가 렌더링되지 않도록 함
    }

    useEffect(() => {
        const { amount, orderId, paymentKey } = searchParams;

        const confirmPayment = async () => {
            try {
                const response = await fetch('http://localhost:4000/billing', {
                    method: 'POST',
                    body: JSON.stringify({ amount, orderId, paymentKey }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(
                        `결제 정보 조회에 실패했습니다: ${response.statusText}`
                    );
                }
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error(error);
                alert('결제 정보 조회에 실패했습니다. 다시 시도해 주세요.');
            }
        };

        confirmPayment();
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-main mt-10">
                결제가 완료되었습니다
            </h1>
            <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                <ul className="list-none text-left">
                    <li className="mb-2">주문번호: {searchParams.orderId}</li>
                    <li className="mb-2">결제 가격: {searchParams.amount}</li>
                    <li className="mb-2">
                        결제승인날짜: {Intl.DateTimeFormat().format(new Date())}
                    </li>
                </ul>
            </div>
            <div className="flex space-x-4 mt-6">
                <Link
                    href="/mypage"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    마이페이지
                </Link>
                <Link
                    href="/buildstory"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    동화 생성 페이지
                </Link>
            </div>
        </div>
    );
};

export default PaymentCompletePage;
