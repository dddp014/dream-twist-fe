/**
File Name : Footer
Description : 푸터
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/
'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/login') {
        return null;
    }

    return (
        <footer className="py-4 bg-gray-100 text-sm text-gray-400 text-center w-full ">
            <div className="container mx-auto">
                <p>ⓒ 2024. 꿈틀. All rights reserved.</p>
            </div>
        </footer>
    );
}
