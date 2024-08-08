/**
File Name : board/CommentBox
Description : 동화 게시판 - 댓글 입력창
Author : 나경윤

History
Date        Author   Status    Description
2024.08.05  나경윤    Created
*/

interface CommentBoxProps {
    editStatus: boolean;
    initialContent: string;
    commentId?: string;  // editStatus가 true일 때만 필요한 속성
    fairytaleId: string;
    onCancel?: () => void;
}

export default function CommentBox({
    editStatus = false,
    initialContent = '',
    onCancel
}: CommentBoxProps) {
    return (
        <div className="mt-3">
            <textarea
                defaultValue={initialContent}
                placeholder="내용을 입력하세요."
                className="w-full h-24 text-base border border-gray-300 resize-none bg-white rounded placeholder:text-base focus:outline-gray-300 p-4"
            ></textarea>
            <div className="flex flex-row justify-end mt-2 mb-4">
                {editStatus && (
                    <button
                        onClick={onCancel}
                        className="text-[0.9rem] text-gray-800 bg-gray-200 rounded-md px-2.5 py-0.5 mr-2"
                    >
                        취소
                    </button>
                )}
                <button className="text-[0.9rem] text-white bg-main rounded-md px-2.5 py-0.5">
                    {editStatus ? '수정' : '등록'}
                </button>
            </div>
        </div>
    );
}
