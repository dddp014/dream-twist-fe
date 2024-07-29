/**
File Name : common/Tag
Description : 태그 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

interface TagProps {
    label: string;
    isSelected: boolean;
    onTagClick: () => void;
}

export default function Tag({ label, isSelected, onTagClick }: TagProps) {
    return (
        <div>
            <button
                type="button"
                onClick={onTagClick}
                className={`w-36 h-14 text-base rounded-xl hover:bg-main hover:text-white ${
                    isSelected ? 'bg-main text-white' : 'bg-gray-100'
                }`}
            >
                {label}
            </button>
        </div>
    );
}
