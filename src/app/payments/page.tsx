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

    const handleClick = async (amount: number, orderName: string, addPoint: number) => {
        try {
            setIsLoading(true);

            const tossPayments: TossPayments = (await loadTossPayments(
                //토스페이먼츠에서 제공하는 결제 요청 메서드를 정의
                process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
            )) as TossPayments;

            await tossPayments.requestPayment('카드', {
                //requestPayment 메서드를 사용하여 카드 결제를 요청한다
                amount,
                orderId: Math.random().toString(36).slice(2),
                orderName,
                successUrl: `${window.location.origin}/payments/complete?addPoint=${addPoint}`,
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
                꿈틀 포인트 구매
            </h1>
            <p className="mt-2 mb-10 text-gray-600">
                나뭇잎을 구매하고 꿈틀의 AI 동화 생성 서비스를 마음껏
                즐겨보세요!
            </p>
            <div className="flex justify-between flex-wrap gap-4 mt-6 w-full max-w-6xl">
                <div className="border border-gray-200 rounded-lg p-6 w-full flex-1 max-w-sm shadow-lg">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            100 나뭇잎
                            <img
                                src="/images/Clover.svg"
                                alt="Leaf Icon"
                                className="ml-2 w-6 h-6"
                            />
                        </h2>
                        <p className="mt-2 text-lg text-green-500">1,000원</p>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleClick(1000, '꿈틀 100 포인트 충전', 100)}
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '구매하기'}
                        </button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 w-full flex-1 max-w-sm shadow-lg">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            300 나뭇잎
                            <img
                                src="/images/Clover.svg"
                                alt="Leaf Icon"
                                className="ml-2 w-6 h-6"
                            />
                        </h2>
                        <p className="mt-2 text-lg text-green-500">3,000원</p>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleClick(3000, '꿈틀 300 포인트 충전', 300)}
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '구매하기'}
                        </button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 w-full flex-1 max-w-sm shadow-lg">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            700 나뭇잎
                            <img
                                src="/images/Clover.svg"
                                alt="Leaf Icon"
                                className="ml-2 w-6 h-6"
                            />
                        </h2>
                        <p className="mt-2 text-lg text-green-500">
                            <del className="text-gray-500">7,000원</del> 5,500원
                        </p>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleClick(5500, '꿈틀 700 포인트 충전', 700)}
                            disabled={isLoading}
                        >
                            {isLoading ? '처리 중...' : '구매하기'}
                        </button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 w-full flex-1 max-w-sm shadow-lg">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            1200 나뭇잎
                            <img
                                src="/images/Clover.svg"
                                alt="Leaf Icon"
                                className="ml-2 w-6 h-6"
                            />
                        </h2>
                        <p className="mt-2 text-lg text-green-500">
                            <del className="text-gray-500">12,000원</del>{' '}
                            10,000원
                        </p>
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() =>
                                handleClick(10000, '꿈틀 1000 포인트 충전', 1200)
                            }
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
