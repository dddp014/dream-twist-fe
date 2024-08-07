/**
File Name : common/Loading
Description : fetch 쓸때 데이터 불러오기전 로딩중 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.08.07  임도헌    Created
*/

import Image from 'next/image';

export default function Loading() {
    return (
        <div className="w-full h-[800px] flex flex-col justify-center items-center">
            <Image src="/images/logo.svg" alt="logo" width={200} height={200} />
            <p className="text-3xl">로딩중...</p>
        </div>
    );
}
