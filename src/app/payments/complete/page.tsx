/**
File Name : app/payments/complete
Description : 결제완료 페이지
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchPaymentData } from '@/api/Payment'; // API 함수 임포트

const PaymentCompletePage = () => {
    const [paymentData, setPaymentData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');
    const addPoint = searchParams.get('addPoint');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken'); // 유저 토큰 가져오기

        if (!orderId || !paymentKey || !amount || !addPoint || !accessToken) {
            setError('결제 정보가 올바르지 않습니다.');
            return;
        }

        const fetchPayment = async () => {
            try {
                const data = await fetchPaymentData(
                    { orderId, paymentKey, amount, addPoint },
                    accessToken
                );
                setPaymentData(data);
            } catch (err) {
                
            }
        };

        fetchPayment();
    }, [orderId, paymentKey, amount, addPoint]);

    if (error) {
        return <div>결제 정보 조회에 실패했습니다: {error}</div>;
    }

    if (!paymentData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-main mt-10">
                결제가 완료되었습니다
            </h1>
            <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                <ul className="list-none text-left">
                    <li className="mb-2">결제 상품: 꿈틀 {addPoint} 나뭇잎</li>
                    <li className="mb-2">주문번호: {orderId}</li>
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
