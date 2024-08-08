/**
File Name : board/CommentList
Description : 동화 게시판 - 댓글 작성/목록
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

'use client';

import { useState, useEffect, useMemo } from 'react';
import EditDeleteBtn from './EditDeleteBtn';
import CommentBox from './CommentBox';
import { getComment } from '@/api/BoardApi';

interface Comment {
    content: string;
    createdAt: string;
    id: string;
}

const PAGE_SIZE = 5;

export default function CommentList({ id }: { id: string }) {
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [commentInfo, setCommentInfo] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('nickname');
        setUserName(storedUserName);

        const fetchCommentList = async () => {
            try {
                const data = await getComment(id);
                const comments: Comment[] = data.map((item: Comment) => ({
                    content: item.content,
                    createdAt: item.createdAt.split('T')[0],
                    id: item.id
                }));
                setCommentInfo(comments);
                console.log('댓글조회', comments);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCommentList();
    }, [id]);

    const totalPages = useMemo(
        () => Math.ceil(commentInfo.length / PAGE_SIZE),
        [commentInfo]
    );

    const paginatedComments = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return commentInfo.slice(start, end);
    }, [commentInfo, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleEditClick = (id: string) => {
        setEditCommentId(id);
    };

    const handleCancelClick = () => {
        setEditCommentId(null);
    };

    return (
        <div className="flex flex-col w-[66.5rem] h-full">
            <div className="w-full">
                <p className="text-xl font-semibold text-left my-6">댓글</p>
                <CommentBox
                    editStatus={false}
                    initialContent=""
                    fairytaleId={id}
                />
                <div className="mt-16">
                    {paginatedComments.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <div
                                        className="border rounded-full w-5 h-5 overflow-hidden mr-2"
                                        style={{
                                            backgroundImage: `url(${item.id})`,
                                            backgroundSize: 'cover'
                                        }}
                                    />
                                    <p className="text-base">{item.id}</p>
                                </div>
                                <div className="flex flex-row items-end -mb-2">
                                    <EditDeleteBtn
                                        id={item.id}
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
                                        commentId={item.id}
                                        fairytaleId={id}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between items-center mt-3">
                                    <p>{item.content}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.createdAt}
                                    </p>
                                </div>
                            )}
                            {index < commentInfo.length - 1 && (
                                <hr className="border-[0.5px] border-gray-200 w-full my-5" />
                            )}
                        </div>
                    ))}
                </div>
                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        {totalPages > 5 && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="text-main px-2 text-[1.3rem]"
                            >
                                {'<<'}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="text-main px-2 text-[1.3rem]"
                        >
                            {'<'}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .slice(
                                Math.max(currentPage - 3, 0),
                                Math.min(currentPage + 2, totalPages)
                            )
                            .map((page) => (
                                <button
                                    type="button"
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 text-[0.9rem] mx-1 rounded-full ${page === currentPage ? 'bg-main text-white' : 'bg-white'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        <button
                            type="button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="text-main px-2 text-[1.3rem]"
                        >
                            {'>'}
                        </button>
                        {totalPages > 5 && (
                            <button
                                type="button"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="text-main px-2 text-[1.3rem]"
                            >
                                {'>>'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
