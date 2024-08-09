/**
File Name : board/CommentBox
Description : 동화 게시판 - 댓글 입력창
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

'use client';

import { useState } from 'react';
import { postComment, putComment } from '@/api/BoardApi';

interface CommentBoxProps {
    editStatus: boolean;
    initialContent: string;
    onCancel?: () => void;
    fairytaleId: string;
    commentId?: string;
}

export default function CommentBox({
    editStatus = false,
    initialContent = '',
    fairytaleId,
    commentId,
    onCancel
}: CommentBoxProps) {
    const [content, setContent] = useState(initialContent);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (!content.trim()) {
                alert('내용을 입력하세요.');
                return;
            }

            if (editStatus && commentId) {
                await putComment(fairytaleId, commentId, content);
            } else {
                await postComment(fairytaleId, content);
            }

            setContent('');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-3">
            <textarea
                value={content}
                onChange={handleChange}
                placeholder="내용을 입력하세요."
                className="w-full h-24 text-base border border-gray-300 resize-none bg-white rounded placeholder:text-base focus:outline-gray-300 p-4"
            />
            <div className="flex flex-row justify-end mt-2 mb-4">
                {editStatus && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-[0.9rem] text-gray-800 bg-gray-200 rounded-md px-2.5 py-0.5 mr-2"
                    >
                        취소
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-[0.9rem] text-white bg-main rounded-md px-2.5 py-0.5"
                >
                    {editStatus ? '수정' : '등록'}
                </button>
            </div>
        </div>
    );
}
