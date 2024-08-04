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

interface PaymentPageProps {
    searchParams: {
        orderId?: string;
    };
}

const PaymentCompletePage: FC<PaymentPageProps> = async ({ searchParams }) => {
    if (!searchParams.orderId) {
        notFound();
    }

    const secretKey = process.env.TOSS_SECRET_KEY || '';
    const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

    const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return <div>결제 정보 조회에 실패했습니다.</div>;
    }

    const payments = await response.json();
    console.log(payments);
    const { card } = payments;

    return (
        <div>
            <h1>결제가 완료되었습니다</h1>
            <ul>
                <li>결제 상품: {payments.orderName}</li>
                <li>주문번호: {payments.orderId}</li>
                {/* <li>카드회사: {card.company}</li>
                <li>카드번호: {card.number}</li>
                <li>결제금액: {card.amount}</li> */}
                <li>
                    결제승인날짜:{' '}
                    {Intl.DateTimeFormat().format(
                        new Date(payments.approvedAt)
                    )}
                </li>
            </ul>
        </div>
    );
};

export default PaymentCompletePage;
