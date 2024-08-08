'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchPaymentData } from '@/api/Payment'; // API 함수 임포트

interface PaymentPageProps {
    searchParams: {
        orderId?: string;
        paymentKey?: string;
        amount?: string;
        addPoint?: string;
    };
}

const PaymentCompletePage: React.FC<PaymentPageProps> = ({ searchParams }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentData, setPaymentData] = useState<any>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken'); // 유저 토큰 가져오기

        const getPaymentData = async () => {
            try {
                const data = await fetchPaymentData(
                    searchParams,
                    accessToken || ''
                );
                setPaymentData(data);
            } catch (error: any) {
                console.error(error);
                setError(
                    error.message ||
                        '결제 정보 조회에 실패했습니다. 다시 시도해 주세요.'
                );
            } finally {
                setLoading(false);
            }
        };

        getPaymentData();
    }, [searchParams]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                        결제 승인 날짜:{' '}
                        {Intl.DateTimeFormat().format(new Date())}
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
