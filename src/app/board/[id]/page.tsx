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
import BookInfo from '@/components/board/BookInfo';
import CommentList from '@/components/board/CommentList';
import { getBookDetail } from '@/api/BoardApi';

export const metadata: Metadata = {
    title: '꿈틀 동화 갤러리',
    description: 'AI로 생성된 꿈틀의 동화 갤러리'
};

export default function Board({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div className="flex flex-col justify-center items-center mx-24 pb-28 pt-12">
            <BookInfo id={id} />
            <div className="flex flex-col w-full h-full justify-center items-center">
                {/* <RenderBook
                    bookImages={bookImages}
                    contents={contents}
                    info={info}
                /> */}
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center mt-16">
                <CommentList />
            </div>
        </div>
    );
}
