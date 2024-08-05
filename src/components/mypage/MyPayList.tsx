/**
File Name : mypage/MyPayList
Description : 마이페이지 - 나의 결제 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

import { payInfo } from '@/types/mypage';

interface MyPayProps {
    payInfo: payInfo[];
}

export default function MyPayList({ payInfo }: MyPayProps) {
    return (
        <div className="flex flex-col justify-start w-full mt-8 h-72 ">
            <div className="overflow-y-auto thin-scrollbar">
                {payInfo.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <p className="text-[1rem]">
                                    결제 상품 : {item.order_name}
                                </p>
                                <p className="text-[1rem]">
                                    결제 금액 : {item.amount}원
                                    <span className="text-gray-400 ml-2">
                                        (결제 수단 - {item.method})
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col text-right mr-6">
                                <p className="text-[0.9rem] text-gray-400">
                                    2024-08-04
                                </p>
                                <p className="text-[0.9rem] text-red-400">
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
                ))}
            </div>
        </div>
    );
}
