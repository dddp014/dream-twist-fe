/**
File Name : board/PreviewBlank
Description : 동화 게시판 - 이미지 프리뷰 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
*/

export default function PreviewBlank() {
    const pageCount: number = 6;

    const createPreviewLabel = (index: number): string => {
        if (index === 0 || index === pageCount - 1) return '커버';
        if (index === 1) return '1';
        if (index === pageCount - 2) return `${(index - 1) * 2}`;

        const startPage = (index - 1) * 2;
        return `${startPage}-${startPage + 1}`;
    };

    const renderPreview = () => {
        return Array.from({ length: pageCount }).map((_, index) => {
            const label = createPreviewLabel(index);
            const width =
                index === 0 || index === pageCount - 1 ? 'w-40' : 'w-60';
            return (
                <div className="flex flex-col text-center mb-9 mt-4">
                    <button type="button">
                        <div
                            key={index}
                            className={`border-solid border border-gray-200 shadow-md shadow-neutral-100 ${width} h-32 mb-3 hover:border-emerald-400 hover:border-4`}
                        >
                            {' '}
                        </div>
                    </button>
                    <span className="text-stone-400">{label}</span>
                </div>
            );
        });
    };

    return (
        <div className="flex overflow-x-scroll w-4/6 custom-scrollbar">
            <div className="flex flex-row whitespace-nowrap space-x-6">
                {renderPreview()}
            </div>
        </div>
    );
}
