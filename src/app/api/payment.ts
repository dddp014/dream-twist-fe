/**
File Name : apis/payment
Description : 결제
Author : 김민규

History
Date        Author   Status    Description
2024.08.04  김민규    Created

*/


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { orderId, paymentKey, amount } = await request.json();
        const secretKey = process.env.TOSS_SECRET_KEY;

        const url = 'https://api.tosspayments.com/v1/payments/confirm';
        const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString(
            'base64'
        );

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                amount,
                orderId,
                paymentKey
            }),
            headers: {
                Authorization: `Basic ${basicToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('결제 요청 실패');
        }

        const responseData = await response.json();

        // TODO: DB 처리

        return NextResponse.json({
            redirectUrl: `/payments/complete?orderId=${orderId}`
        });
    } catch (error) {
        console.error('결제 서버 에러', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
