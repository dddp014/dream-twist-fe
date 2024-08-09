/**
File Name : app/page
Description : 메인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Modified  메인 화면 구현
2024.08.02  나경윤    Modified  전체 동화 api 연결
2024.08.09  나경윤    Modified  배너 추가
*/

import SearchBook from '@/components/main/SearchBook';
import ScrollUpButton from '@/components/main/ScrollUpButton';
import MainBanner from '@/components/main/MainBanner';

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center mx-24 mt-16">
            <MainBanner />
            <div className="flex flex-col justify-center items-center w-full">
                <SearchBook />
            </div>
            <ScrollUpButton />
        </main>
    );
}
