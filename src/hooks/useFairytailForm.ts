/**
File Name : hooks/useFairytailForm
Description : useFairytailForm에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.03  임도헌   Modified   동화최종생성폼 훅 추가
2024.08.05  임도헌   Modified   ai로 생성한 데이터 로컬스토리지에서 불러와서 반영
2024.08.07  임도헌   Modified   fairytaleId를 기준으로 id가 있다면 fetch 사용, 아니라면 생성이므로 localstorage를 사용
*/

import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export const useFairytailForm = (fairytaleId?: number) => {
    // 페이지 이동(preview)
    const router = useRouter();
    // block 클릭 상태
    const [isClick, setIsClick] = useState<number>(0);
    // 로딩 상태 추가
    const [loading, setLoading] = useState<boolean>(true);

    // Form 상태
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IFairyTaleFormInputs>({
        defaultValues: {
            title: '',
            theme: '',
            storys: [],
            isPublic: false
        }
    });

    useEffect(() => {
        const fairytaleData = async () => {
            if (fairytaleId) {
                try {
                    const response = await fetch(
                        `http://localhost:4000/fairytale/${fairytaleId}`
                    );
                    const data = await response.json();
                    const savedTitle = data[0].title;
                    const savedTheme = data[0].theme;
                    const savedStorys = Object.values(
                        data[0].content
                    ) as string[];
                    reset({
                        title: savedTitle,
                        theme: savedTheme,
                        storys: savedStorys,
                        isPublic: false // 나중에 isPublic 오면 수정해야됨
                    });
                } catch (error) {
                    console.error(`Error fetching fairytale data: ${error}`);
                }
            } else {
                const savedTitle = loadFromLocalStorage<string>('title');
                const savedTheme = loadFromLocalStorage<string>('theme');
                const savedStorys = loadFromLocalStorage<string[]>('storys');

                reset({
                    title: savedTitle || '',
                    theme: savedTheme || '',
                    storys: savedStorys || [],
                    isPublic: false
                });
            }
            setLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
        };

        fairytaleData();
    }, [fairytaleId, reset]);

    /**
     * 1. 동화 상태 저장 후 페이지 이동
     * 2. localStorage 사용한 동화 상태 각각 제목, 주제, 스토리 배열, 공개 여부 상태를 세팅한다.
     * 3. localStorage로 세팅 후 페이지 이동
     */
    const onSubmit: SubmitHandler<IFairyTaleFormInputs> = (data) => {
        if (fairytaleId) {
            saveToLocalStorage('title', data.title);
            saveToLocalStorage('theme', data.theme);
            saveToLocalStorage('storys', data.storys);
            saveToLocalStorage('isPublic', data.isPublic);
            router.push(`/final-edit/${fairytaleId}`);
        } else {
            saveToLocalStorage('title', data.title);
            saveToLocalStorage('theme', data.theme);
            saveToLocalStorage('storys', data.storys);
            saveToLocalStorage('isPublic', data.isPublic);
            router.push('/final-edit');
        }
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
        onSubmit,
        loading
    };
};

export default useFairytailForm;
