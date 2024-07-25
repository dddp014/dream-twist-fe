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
*/

'use client';

import Link from 'next/link';
import { useState } from 'react';
import Toggle from '../common/Toggle';
import StoryBlock from './StoryBlock';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface IFairyTaleFormInputs {
    title: string;
    theme: string;
    storys: string[];
}

export default function FairytailForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFairyTaleFormInputs>();
    const onSubmit: SubmitHandler<IFairyTaleFormInputs> = (data) => {
        console.log(data);
    };

    const [isClick, setIsClick] = useState(0);

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
                        동화 주제 및 줄거리
                    </label>
                    <textarea
                        id="theme"
                        {...register('theme', { required: true })}
                        className="w-[280px] h-[460px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2"
                        placeholder="주제 및 줄거리를 입력해주세요."
                    />
                    {errors.title && (
                        <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                            주제 및 줄거리를 입력해주세요.
                        </span>
                    )}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-end">
                    <Toggle register={register} />
                    <button
                        type="submit"
                        className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base"
                    >
                        저장
                    </button>
                    <Link
                        href={''}
                        className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base"
                    >
                        다음 단계
                    </Link>
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
