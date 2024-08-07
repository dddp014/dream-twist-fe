/**
File Name : app/payments/complete
Description : 결제완료 페이지
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/

import { notFound } from 'next/navigation';
import { FC } from 'react';
import Link from 'next/link';

interface PaymentPageProps {
    searchParams: {
        orderId?: string;
        paymentKey?: string;
        amount?: string;
        addPoint?: string;
    };
}

const PaymentCompletePage: FC<PaymentPageProps> = async ({ searchParams }) => {
    if (!searchParams.orderId) {
        notFound();
    }
    console.log(searchParams);

    // const secretKey = process.env.TOSS_SECRET_KEY || '';
    // const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

    const response = await fetch('http://localhost:4000/billing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: searchParams.orderId,
            paymentKey: searchParams.paymentKey,
            amount: searchParams.amount,
            addPoint: searchParams.addPoint
        })
    });
    console.log(response);

    if (!response.ok) {
        console.error('fetch 실패 ', response.status, response.statusText);
        return <div>결제 정보 조회에 실패했습니다.</div>;
    }

    const payments = await response.json();
    console.log(payments);

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-main mt-10">
                결제가 완료되었습니다
            </h1>
            <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                <ul className="list-none text-left">
                    <li className="mb-2">
                        결제 상품: 꿈틀 {searchParams.addPoint} 나뭇잎
                    </li>
                    <li className="mb-2">주문번호: {searchParams.orderId}</li>
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
