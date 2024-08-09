/**
File Name : apis/payment
Description : 결제
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/

export const fetchPaymentData = async (searchParams: {
    orderId?: string;
    paymentKey?: string;
    amount?: string;
    addPoint?: string;
}, accessToken: string) => {
    if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
    }

    if (!searchParams.orderId) {
        throw new Error('주문 번호가 유효하지 않습니다.');
    }

    const response = await fetch('http://localhost:4000/billing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            orderId: searchParams.orderId,
            paymentKey: searchParams.paymentKey,
            amount: searchParams.amount,
            addPoint: searchParams.addPoint
        })
    });

    if (!response.ok) {
        throw new Error(`결제 정보 조회에 실패했습니다: ${response.statusText}`);
    }

    return response.json();
};