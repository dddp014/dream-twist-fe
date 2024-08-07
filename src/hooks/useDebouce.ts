/**
File Name : hooks/useDebounce
Description : 디바운싱 훅
Author : 나경윤

History
Date        Author   Status    Description
2024.08.07  나경윤    Created
*/

import { useEffect, useState } from 'react';

const useDebounce = (value: string) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
