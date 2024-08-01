/**
File Name : components/edit/FairytailStoryForm
Description : 동화 내용 폼 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌   Created
2024.07.24  임도헌   Modified  Toggle 컴포넌트 분리
2024.07.25  임도헌   Modified  StoryBlock 컴포넌트 분리
2024.07.25  임도헌   Modified  FairytailInfo 컴포넌트와 병합
2024.07.25  임도헌   Modified  컴포넌트 전체 수정
2024.07.26  임도헌   Modified  select및 summary 코드 수정
2024.07.30  임도헌   Modified  summary 주석 처리 및 코드 주석 추가, jotai 상태 관리 추가
2024.07.31  임도헌   Modified  jotai 제거 및 localStorage 사용하는 코드로 변경
*/

'use client';

import { useState } from 'react';
import Toggle from '../common/Toggle';
import StoryBlock from './StoryBlock';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DropIcon } from '../icons/DropIcon';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from '@/utils/localStorage';

export interface IFairyTaleFormInputs {
    title: string;
    theme: string;
    // summary: string;
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

export default function FairytailForm() {
    // 페이지 이동(book-preview)
    const router = useRouter();

    // block 클릭 상태
    const [isClick, setIsClick] = useState<number>(0);

    // Form 상태
    const {
        register,
        handleSubmit,
        setValue,
        watch,
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full m-4 mt-4 p-2 pl-1 border border-green-300 rounded-lg shadow"
        >
            <div className="">
                <div className="max-w-xs mt-8 ml-8">
                    <label htmlFor="title" className="m-4 text-2xl">
                        동화 제목
                    </label>
                    <input
                        id="title"
                        {...register('title', { required: true })}
                        className="w-[280px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2"
                        placeholder="제목을 입력해주세요."
                    />
                    {errors.title && (
                        <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                            동화 제목을 입력해주세요.
                        </span>
                    )}
                    <label htmlFor="theme" className="m-4 text-2xl">
                        주제
                    </label>
                    <div className="relative">
                        <div className="absolute top-[34px] left-[270px]">
                            <DropIcon rotate="" />
                        </div>
                        <select
                            className="w-[280px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2 appearance-none"
                            id="theme"
                            {...register('theme', { required: true })}
                        >
                            <option value="">주제를 선택해주세요.</option>
                            {themes.map(({ name }) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* 이 코드 살릴수도 있고 없앨수도 있음 */}
                    {/* <label htmlFor="summary" className="m-4 text-2xl">
                        줄거리 요약
                    </label>
                    <textarea
                        id="summary"
                        {...register('summary', { required: true })}
                        className="w-[280px] h-[460px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2"
                        placeholder="주제 및 줄거리를 입력해주세요."
                    />
                    {errors.summary && (
                        <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                            주제 및 줄거리를 입력해주세요.
                        </span>
                    )} */}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-end">
                    <Controller
                        name="isPublic"
                        control={control}
                        render={({ field }) => (
                            <Toggle
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <button
                        type="submit"
                        className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base"
                    >
                        다음 페이지로 가야 저장됩니다.
                    </button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <StoryBlock
                        key={index}
                        index={index}
                        isClick={isClick}
                        handleClick={handleClick}
                        register={register}
                        errors={errors}
                    />
                ))}
            </div>
        </form>
    );
}
