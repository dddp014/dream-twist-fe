/**
File Name : buildstory/layout
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.20  김민규    Created
*/
import NextArrow from '@/images/next-arrow.svg';
import Image from 'next/image';

function BuildStoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className="py-2 bg-green-400 text-white text-center rounded mb-4">
                <div className="container mx-auto flex items-center justify-center">
                    <span className="px-2 bg-green-300 rounded ">
                        AI 스토리 추천
                    </span>
                    <Image
                        src={NextArrow}
                        alt="nextArrow"
                        width={10}
                        className="mr-4 ml-4"
                    />
                    <span className="px-2">글 편집</span>
                    <Image
                        src={NextArrow}
                        alt="nextArrow"
                        width={10}
                        className="mr-4 ml-4"
                    />
                    <span className="px-2">이미지 편집</span>
                </div>
            </header>
            {children}
        </div>
    );
}
export default BuildStoryLayout;
