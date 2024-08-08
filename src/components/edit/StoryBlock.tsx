/* eslint-disable @typescript-eslint/no-explicit-any */
/**
File Name : components/edit/StoryBlock
Description : 동화 내용 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.25  임도헌   Create  
2024.07.25  임도헌   Modified  StoryBlock 컴포넌트 분리
2024.07.26  임도헌   Create    StoryBlock 컴포넌트 색상 변경
*/

import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';
import { IFairyTaleFormInputs } from '@/hooks/useFairytailForm';

interface StoryBlockProps {
    index: number;
    isClick: number;
    handleClick: (index: number) => void;
    register: UseFormRegister<any>;
    errors: FieldErrors<IFairyTaleFormInputs>;
}

export default function StoryBlock({
    index,
    isClick,
    handleClick,
    register,
    errors
}: StoryBlockProps) {
    const pageError = errors.storys?.[index] as FieldError | undefined;
    return (
        <div
            key={index}
            className={`m-4 rounded-lg p-4 hover:border hover:bg-green-50 hover:border-green-300 active:bg-green-100
        ${isClick === index ? 'bg-green-50 border border-green-200' : ''}`}
            onClick={() => {
                handleClick(index);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleClick(index);
                }
            }}
            tabIndex={0} // 요소를 포커스 가능하게 만듭니다.
            role="button" // 요소에 버튼 역할을 부여합니다.
        >
            <label
                htmlFor={`story${index}`}
                className="w-full text-3xl font-bold"
            >
                {index + 1}
            </label>
            <div className="w-full my-[1%] border-[1px] border-lightGray-300" />
            <textarea
                id={`story${index}`}
                {...register(`storys.${index}`, { required: true })}
                className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-50 active:bg-green-100
                ${isClick === index ? 'bg-green-50 border-green-200' : ''}`}
                placeholder="줄거리를 입력해주세요."
            />
            {pageError && (
                <span className="block ml-4 mb-2 text-sm text-red-600 font-bold">
                    동화{index + 1}의 내용을 입력해주세요.{' '}
                </span>
            )}
        </div>
    );
}
