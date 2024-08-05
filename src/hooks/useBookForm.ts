/**
File Name : hooks/useBookForm
Description : Book 컴포넌트에서 사용하는 훅폼
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
*/

import { useForm } from 'react-hook-form';
import { useFairytailInfo } from './useFairytailInfo';
import { useEffect } from 'react';

type PageData = {
    image: File | null;
    story: string;
};

type FormData = {
    title: string;
    theme: string;
    cover: File | null;
    isPublic: boolean;
    pages: PageData[];
};

export const useBookForm = () => {
    // 로컬 스토리지 데이터 불러오기
    const { title, theme, storys, isPublic } = useFairytailInfo();
    // useForm 사용해서 값 세팅한다.
    const { register, setValue, watch, handleSubmit, reset, control } =
        useForm<FormData>({
            defaultValues: {
                cover: null,
                theme: theme,
                isPublic: isPublic,
                pages:
                    storys.length > 0
                        ? storys.map((story) => ({ image: null, story }))
                        : [{ image: null, story: '' }]
            }
        });

    // 새로 고침 발생 시 새로 reset해서 현재 값 세팅
    useEffect(() => {
        reset({
            title,
            theme,
            cover: null,
            isPublic,
            pages: storys.map((story) => ({ image: null, story }))
        });
    }, [title, theme, storys, isPublic, reset]);

    // 현재 페이지랑 커버 볼수 있게
    const pages = watch('pages');
    const cover = watch('cover');

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        reset,
        control,
        pages,
        cover,
        title,
        theme
    };
};
