/**
File Name : hooks/useFairytailInfo
Description : 동화 정보 로컬스토리지 로드 
Author : 임도헌

History
Date        Author   Status    Description
2024.07.31  임도헌    Created
*/

import { loadFromLocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';

export const useFairytailInfo = () => {
    const [title, setTitle] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const [storys, setStorys] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    // 컴포넌트 마운트 시 localStorage에서 데이터 불러온다.
    useEffect(() => {
        const savedTitle = loadFromLocalStorage<string>('title');
        const savedTheme = loadFromLocalStorage<string>('theme');
        const savedStorys = loadFromLocalStorage<string[]>('storys');
        const savedIsPublic = loadFromLocalStorage<boolean>('isPublic');

        if (savedTitle) setTitle(savedTitle);
        if (savedTheme) setTheme(savedTheme);
        if (savedStorys) setStorys(savedStorys);
        if (savedIsPublic) setIsPublic(savedIsPublic);
    }, []);

    return {
        title,
        theme,
        storys,
        isPublic
    };
};
