/**
File Name : app/page
Description : 메인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Modified  메인 화면 구현
2024.08.02  나경윤    Modified  전체 동화 api 연결
*/

import SearchBook from '@/components/main/SearchBook';
import ScrollUpButton from '@/components/main/ScrollUpButton';
import GetToken from '@/components/auth/GetToken';

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center mx-24 mt-16">
            <GetToken />
            <div className="bg-main-100 h-80 w-full mb-16 rounded-xl" />
            <div className="flex flex-col justify-center items-center w-full">
                <SearchBook />
            </div>
            <ScrollUpButton />
        </main>
    );
}
