/**
File Name : types/fairytale
Description : 동화 타입 정의
Author : 나경윤

History
Date        Author   Status    Description
2024.08.04  나경윤    Created
*/

export interface FairytaleInfo {
    fairytaleId: number;
    title: string;
    theme: string;
    nickname: string;
    coverImage: string;
    createdAt: string;
    views: number;
    likes: number;
}
