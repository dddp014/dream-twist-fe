/* eslint-disable react/no-array-index-key */
/**
File Name : components/edit/FairytailStoryForm
Description : 동화 내용 폼 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌   Created
2024.07.22  임도헌   Modified  동화 내용 컴포넌트 추가
2024.07.24  임도헌   Modified  Toggle 컴포넌트 분리
2024.07.25  임도헌   Modified  StoryBlock 컴포넌트 분리
2024.07.25  임도헌   Modified  FairytailInfo 컴포넌트와 병합
2024.07.25  임도헌   Modified  컴포넌트 전체 수정
2024.07.26  임도헌   Modified  select및 summary 코드 수정
2024.07.30  임도헌   Modified  summary 주석 처리 및 코드 주석 추가, jotai 상태 관리 추가
2024.07.31  임도헌   Modified  jotai 제거 및 localStorage 사용하는 코드로 변경
2024.08.03  임도헌   Modified  훅 분리
2024.08.07  임도헌   Modified  loading 페이지 추가
2024.08.07  임도헌   Modified  유저가 페이지 새로고침이나 나갈려 할때 usePageLeaveCheck 추가
*/

'use client';

import { Controller } from 'react-hook-form';
import Toggle from '../common/Toggle';
import StoryBlock from './StoryBlock';
import { DropIcon } from '../icons/DropIcon';
import useFairytailForm, { themes } from '@/hooks/useFairytailForm';
import Loading from '../common/Loading';
import usePageLeaveCheck from '@/hooks/usePageLeaveCheck';

interface FairytailFormProps {
    fairytaleId?: number;
}

export default function FairytailForm({ fairytaleId }: FairytailFormProps) {
    // 페이지 나갈때 체크
    usePageLeaveCheck();
    const {
        register,
        handleSubmit,
        control,
        errors,
        isClick,
        handleClick,
        onSubmit,
        loading
    } = useFairytailForm(fairytaleId);

    if (loading) {
        return <Loading />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full m-4 mt-4 p-2 pl-1 border border-green-300 rounded-lg shadow"
        >
            <div className="">
                <div className="max-w-xs mt-8 ml-8">
                    <label htmlFor="title" className="m-4 text-2xl">
                        동화 제목
                        <input
                            id="title"
                            {...register('title', { required: true })}
                            className="w-[280px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2"
                            placeholder="제목을 입력해주세요."
                        />
                    </label>
                    {errors.title && (
                        <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                            동화 제목을 입력해주세요.
                        </span>
                    )}
                    <label htmlFor="theme" className="m-4 text-2xl">
                        주제
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
                    </label>
                    {errors.theme && (
                        <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                            주제를 선택해 주세요.
                        </span>
                    )}
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
                {Array.from({ length: 6 }).map((_, index) => (
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

FairytailForm.defaultProps = {
    fairytaleId: null
};
