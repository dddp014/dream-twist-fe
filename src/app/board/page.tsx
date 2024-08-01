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
        <div className="h-screen flex flex-col justify-center items-center mt-8 mx-24 mb-10">
            <div className="flex flex-col w-full mb-10">
                <div className="flex flex-row justify-center mb-3">
                    <p className="text-2xl font-semibold flex-grow text-center ml-24">
                        뽀로로와 지구온난화
                    </p>
                    <div className="flex flex-row items-center -mb-1">
                        <Image
                            src={'/images/default-profile.svg'}
                            alt="profile"
                            width={19}
                            height={0}
                            className="mt-[0.8rem] mr-1"
                        />
                        <p className="text-base self-end">김민규 작가</p>
                    </div>
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="text-right mt-2">
                    <BookLike />
                </div>
            </div>
            <RenderBook bookImages={sampleImages} contents={contents} />
        </div>
    );
};

export default Board;
