/**
File Name : mypage/MyPayList
Description : 마이페이지 - 나의 결제 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

'use client';

import { useEffect, useState } from 'react';
import { getMyPayList } from '@/api/MypageApi';

export default function MyPayList() {
    const [payInfo, setPayInfo] = useState([]);

    useEffect(() => {
        const fetchMyPay = async () => {
            try {
                const data = await getMyPayList();
                const payData = data.map((item) => ({
                    ...item
                }));
                setPayInfo(payData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyPay();
    }, []);

    return (
        <div className="flex flex-col justify-start w-full mt-8 h-72 ">
            <div className="overflow-y-auto thin-scrollbar">
                {payInfo.length > 0 ? (
                    payInfo.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <p className="text-[1.1rem] font-medium text-main">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center text-[1.05rem] mt-0.5">
                                        <p className="">
                                            결제 금액 : {item.amount}원
                                        </p>
                                        <div className="flex flex-row items-center text-[0.9rem]">
                                            <span className="ml-2">
                                                ({item.method}
                                            </span>
                                            <span className="ml-1 ">
                                                <span> - </span>
                                                <span
                                                    className={`${item.status === 'DONE' ? 'text-blue-500' : 'text-red-500'}`}
                                                >
                                                    {item.status === 'DONE'
                                                        ? '승인'
                                                        : '취소'}
                                                </span>
                                                <span>)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col text-right mr-6">
                                    <p className="text-[0.9rem] text-gray-400">
                                        {item.createdAt}
                                    </p>
                                    <p
                                        className={`text-[0.9rem] ${item.isRefundable === 'T' ? 'text-blue-500' : 'text-red-500'}`}
                                    >
                                        {item.isRefundable === 'T'
                                            ? '환불 가능'
                                            : '환불 불가'}
                                    </p>
                                </div>
                            </div>
                            {index < payInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-4" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-left text-gray-500">
                        결제 내역이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}
