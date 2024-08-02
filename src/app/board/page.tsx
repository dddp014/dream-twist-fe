/**
File Name : board/page
Description : 동화 게시판
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.31  나경윤    Modified  북 렌더 컴포넌트 통합
*/

import Image from 'next/image';
import RenderBook from '@/components/board/RenderBook';
import BookLike from '@/components/board/BookLike';
import Sample1 from '../../../public/images/sample1.svg';
import Sample2 from '../../../public/images/sample2.svg';
import { contents } from '@/utils/dummyBooks';
import { getBookDetail } from '@/apis/Board';

// api 연동 예정
const sampleImages = [
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample1,
    Sample2,
    Sample2
];

const Board = async () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center mt-8 mx-24 mb-12">
            <div className="flex flex-col w-full mb-6">
                <div className="flex flex-row justify-center items-center mb-3">
                    <p className="text-2xl font-semibold">
                        뽀로로와 지구온난화
                    </p>
                    <p className="text-[17px] ml-5">김민규 작가</p>
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="flex flex-row mt-2 justify-between">
                    <div className="flex flex-row">
                        <p className="text-gray-500 text-[13px]">2024.08.01</p>
                        <p className="text-gray-500 text-[13px] ml-2">조회 8</p>
                    </div>
                    <div className="self-end">
                        <BookLike />
                    </div>
                </div>
            </div>
            <RenderBook bookImages={sampleImages} contents={contents} />
        </div>
    );
};

export default Board;
