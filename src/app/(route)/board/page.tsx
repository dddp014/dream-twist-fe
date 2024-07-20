/**
File Name : board/page
Description : 동화 게시판
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤   Created
*/

import PreviewBlank from '@/components/board/PreviewBlank';
import BookViewer from '@/components/board/BookViewer';

export default function Board() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <BookViewer />
            <div className="text-center mb-10">
                <p className="text-xl font-semibold">뽀로로와 지구온난화</p>
                <p className="text-base pt-1">김민규 작가</p>
            </div>
            <PreviewBlank />
        </div>
    );
}
