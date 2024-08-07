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
import { notFound } from 'next/navigation';
import RenderBook from '@/components/board/RenderBook';
import BookLike from '@/components/board/BookLike';
import EditDeleteBtn from '@/components/board/EditDeleteBtn';
import CommentList from '@/components/board/CommentList';
import { getBookDetail } from '@/api/BoardApi';

export const metadata: Metadata = {
    title: '꿈틀 동화 갤러리',
    description: 'AI로 생성된 꿈틀의 동화 갤러리'
};

export default async function Board({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const data = await getBookDetail(id);

        if (!data || data.length === 0) {
            notFound();
        }

        // console.log(data);

        const bookImages = [data[0].coverImage, ...data[0].images];
        const contents: string[] = [
            ...(Object.values(data[0].content) as string[])
        ];
        const info = [data[0].title, data[0].nickname];

        return (
            <div className="flex flex-col justify-center items-center mx-24 pb-28 pt-12">
                <div className="relative flex flex-col w-full mb-4">
                    <div className="flex flex-row justify-center items-center mb-3 m-auto">
                        <p className="text-2xl font-semibold">
                            {data[0].title}
                        </p>
                        <p className="text-[17px] ml-5">
                            {data[0].nickname} 작가
                        </p>
                        <div className="flex flex-row items-center absolute right-0 bottom-14">
                            <EditDeleteBtn id={id} modalType="book" />
                        </div>
                    </div>
                    <hr className="border border-zinc-200 opacity-70" />
                    <div className="flex flex-row mt-2 justify-between">
                        <p className="text-gray-500 text-[14px]">
                            조회 {data[0].views}
                        </p>
                        <div className="self-end">
                            <BookLike />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <RenderBook
                        bookImages={bookImages}
                        contents={contents}
                        info={info}
                    />
                </div>
                <div className="flex flex-col w-full h-full justify-center items-center mt-16">
                    <CommentList />
                </div>
            </div>
        );
    } catch (error) {
        notFound();
        return null;
    }
}
