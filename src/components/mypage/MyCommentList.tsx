/**
File Name : mypage/MyCommentList
Description : 마이페이지 - 나의 댓글 리스트
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

import { commentInfo } from '@/types/mypage';

interface MyCommentProps {
    commentInfo: commentInfo[];
}

export default function MyCommentList({ commentInfo }: MyCommentProps) {
    return (
        <div className="flex flex-col justify-start w-full mt-8 h-72 ">
            <div className="overflow-y-auto thin-scrollbar">
                {commentInfo.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex flex-row justify-between">
                            <div>
                                <p className="text-[1.05rem]">{item.content}</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <p className="text-[1.05rem] text-main font-medium">
                                    {item.title}
                                </p>
                                <div className="w-px h-4 bg-gray-300 mx-3" />
                                <p className="text-[0.9rem] text-gray-400 mr-6">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                        {index < commentInfo.length - 1 && (
                            <hr className="border-[0.5px] border-gray-200 w-full my-4" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
