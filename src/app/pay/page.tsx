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

    const handleClick = async (amount: number, orderName: string) => {
        try {
            setIsLoading(true);

            const tossPayments: TossPayments = (await loadTossPayments(
                process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
            )) as TossPayments;

            await tossPayments.requestPayment('카드', {
                amount,
                orderId: Math.random().toString(36).slice(2),
                orderName,
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
        <div className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-main mt-10">
                꿈틀 이용권 구매
            </h1>
            <p className="mt-2 mb-10 text-gray-600">
                이용권을 구매하고 꿈틀의 AI 동화 생성 서비스를 마음껏
                즐겨보세요!
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
                <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">
                                1개월 이용권
                            </h2>
                            <p className="mt-2 text-lg text-green-500">
                                <del className="text-gray-500">180,000원</del>{' '}
                                110,000원
                            </p>
                            <ul className="mt-4 list-none">
                                <li>✔️ AI 줄거리 생성 하루 최대 10회</li>
                                <li>✔️ AI 이미지 생성 하루 최대 10회</li>
                            </ul>
                        </div>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleClick(110000, '꿈틀 1달 구독')}
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '구매하기'}
                        </button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">
                                3개월 이용권
                            </h2>
                            <p className="mt-2 text-lg text-green-500">
                                <del className="text-gray-500">540,000원</del>{' '}
                                300,000원
                            </p>
                            <ul className="mt-4 list-none">
                                <li>✔️ AI 줄거리 생성 하루 최대 30회</li>
                                <li>✔️ AI 이미지 생성 하루 최대 30회</li>
                            </ul>
                        </div>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleClick(300000, '꿈틀 3달 구독')}
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '구매하기'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
