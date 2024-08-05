/**
File Name : board/CommentList
Description : 동화 게시판 - 댓글 작성/목록
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

'use client';

import { dummyComments } from '@/utils/dummyBooks';
import { useState } from 'react';
import EditDeleteBtn from './EditDeleteBtn';
import CommentBox from './CommentBox';

export default function CommentList() {
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editBox, setEditBox] = useState(false);

    const commentInfo = dummyComments.map((item) => {
        return { ...item };
    });

    const handleEditClick = (id: string) => {
        setEditCommentId(id);
    };

    const handleCancelClick = () => {
        setEditCommentId(null);
    };

    return (
        <div className="flex flex-col w-[66.5rem] h-full">
            <div className="w-full">
                <p className="text-xl font-semibold text-left mb-4">댓글</p>
                <CommentBox editStatus={false} initialContent="" />
                <div className="mt-16">
                    {commentInfo.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <div
                                        className="border rounded-full w-5 h-5 overflow-hidden mr-2"
                                        style={{
                                            backgroundImage: `url(${item.profile})`,
                                            backgroundSize: 'cover'
                                        }}
                                    />
                                    <p className="text-base">{item.username}</p>
                                </div>
                                <div className="flex flex-row items-end -mb-2">
                                    <EditDeleteBtn
                                        id={'1'}
                                        modalType="comment"
                                        onEditClick={() =>
                                            handleEditClick(item.id)
                                        }
                                    />
                                </div>
                            </div>
                            {editCommentId === item.id ? (
                                <div>
                                    <CommentBox
                                        editStatus={true}
                                        onCancel={handleCancelClick}
                                        initialContent={item.content}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between items-center mt-3">
                                    <p>{item.content}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.date}
                                    </p>
                                </div>
                            )}
                            {index < commentInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-5" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
