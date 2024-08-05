/**
File Name : types/mypage
Description : 마이페이지 이용 데이터 타입 정의
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

export interface commentInfo {
    id: string;
    fairytaleId: string;
    content: string;
    title: string;
    date: string;
}

export interface payInfo {
    id: string;
    amount: string;
    method: string;
    order_name: string;
    isRefundable: string;
}
