/**
File Name : main/TagList
Description : 태그 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Created
*/

'use client';

import { useState } from 'react';
import Tag from '../common/Tag';

const tags: string[] = [
    '모든 주제',
    '신화',
    '전래동화',
    '권선징악',
    '예술',
    '추리',
    '사랑'
];

export default function TagList() {
    const [selectedTag, setSelectedTag] = useState<string>('모든 주제');

    const handleTagClick = (label: string) => {
        setSelectedTag(label);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row space-x-6">
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        label={tag}
                        isSelected={selectedTag === tag}
                        onTagClick={() => handleTagClick(tag)}
                    />
                ))}
            </div>
        </div>
    );
}
