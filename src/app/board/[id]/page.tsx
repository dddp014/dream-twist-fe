/**
File Name : board/page
Description : 동화 게시판
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.31  나경윤    Modified  북 렌더 컴포넌트 통합
*/

import { Metadata } from 'next';
import RenderBook from '@/components/board/RenderBook';
import BookLike from '@/components/board/BookLike';
import EditDeleteBtn from '@/components/board/EditDeleteBtn';
import Sample1 from '../../../../public/images/sample1.svg';
import Sample2 from '../../../../public/images/sample2.svg';
import { getBookDetail } from '@/api/BoardApi';

export const metadata: Metadata = {
    title: '꿈틀 동화 갤러리',
    description: 'AI로 생성된 꿈틀의 동화 갤러리'
};

const sampleImages = [
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample2
];

export default async function Board({ params }: { params: { id: string } }) {
    const { id } = params;
    const data = await getBookDetail(id);
    // const bookImages = [data[0].coverImage, ...data[0].images];
    const contents: string[] = [
        '내용00',
        '내용01',
        '내용02',
        ...(Object.values(data[0].content) as string[])
    ];

    return (
        <div className="h-screen flex flex-col justify-center items-center mt-8 mx-24 mb-12">
            <div className="relative flex flex-col w-full mb-6">
                <div className="flex flex-row justify-center items-center mb-3 m-auto">
                    <p className="text-2xl font-semibold">{data[0].title}</p>
                    <p className="text-[17px] ml-5">{data[0].nickname} 작가</p>
                    <div className="flex flex-row items-center absolute right-0 bottom-14">
                        <EditDeleteBtn />
                    </div>
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="flex flex-row mt-2 justify-between">
                    <p className="text-gray-500 text-[14px]">조회 8</p>
                    <div className="self-end">
                        <BookLike />
                    </div>
                </div>
            </div>
            <RenderBook bookImages={sampleImages} contents={contents} />
        </div>
    );
}
