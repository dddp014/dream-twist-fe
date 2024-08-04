/**
File Name : hooks/useFairytailForm
Description : useFairytailForm에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
*/

import { saveToLocalStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface IFairyTaleFormInputs {
    title: string;
    theme: string;
    storys: string[];
    isPublic: boolean;
}

export type theme = {
    name: string;
};

export const themes: theme[] = [
    { name: '우화' },
    { name: '환경' },
    { name: '사랑' },
    { name: '모험' },
    { name: '추리' },
    { name: '기타' }
];

export const useFairytailForm = () => {
    // 페이지 이동(book-preview)
    const router = useRouter();
    // block 클릭 상태
    const [isClick, setIsClick] = useState<number>(0);

    // Form 상태
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<IFairyTaleFormInputs>({
        defaultValues: {
            title: '',
            theme: '',
            storys: [],
            isPublic: false
        }
    });

    /**
     * 1. 동화 상태 저장 후 페이지 이동
     * 2. localStorage 사용한 동화 상태 각각 제목, 주제, 스토리 배열, 공개 여부 상태를 세팅한다.
     * 3. localStorage로 세팅 후 페이지 이동
     */
    const onSubmit: SubmitHandler<IFairyTaleFormInputs> = (data) => {
        saveToLocalStorage('title', data.title);
        saveToLocalStorage('theme', data.theme);
        saveToLocalStorage('storys', data.storys);
        saveToLocalStorage('isPublic', data.isPublic);
        router.push('/book-preview');
    };

    /**
     * handleClick: 몇번 줄거리 선택 시 인덱스 변경
     * @param {number} idx
     */
    const handleClick = (idx: number) => {
        setIsClick(idx);
    };

    return {
        register,
        handleSubmit,
        control,
        errors,
        isClick,
        handleClick,
        onSubmit
    };
};

export default useFairytailForm;
