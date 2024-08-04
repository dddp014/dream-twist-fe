/**
File Name : app/pay/page
Description : 결제 페이지
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/

'use client';

import { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

// 결제 요청 옵션 타입을 정의한다
interface PaymentOptions {
    amount: number;
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
}

interface TossPayments {
    requestPayment(method: '카드', options: PaymentOptions): Promise<void>;
}

const Page: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);

            // 기본 타입을 사용하여 타입 검사를 수행합니다.
            const tossPayments: TossPayments = (await loadTossPayments(
                process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
            )) as TossPayments;

            await tossPayments.requestPayment('카드', {
                amount: 10000,
                orderId: Math.random().toString(36).slice(2),
                orderName: '꿈틀 1달 구독',
                successUrl: `${window.location.origin}/payments/complete`,
                failUrl: `${window.location.origin}/apis/payments/fail`
            });
        } catch (error) {
            console.error('결제 요청 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? '처리 중...' : '100코인 10000원'}
            </button>
        </div>
    );
};

export default Page;
