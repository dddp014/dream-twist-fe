/**
File Name : book-preview/Book
Description : 동화 편집 - 스토리를 책 모양으로 볼 수 있고 편집도 가능한 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.23  임도헌    Created
2024.07.23  임도헌   Modified  모달기능 추가 및 코드 리팩토링
2024.07.30  임도헌   Modified  리액트 훅 폼 추가해야 될듯?
2024.07.31  임도헌   Modified  react-hook-form으로 코드 변경(아직 미완성)
2024.08.01  임도헌   Modified  portal 수정 및 전체 코드 변경
*/

'use client';

import { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import StoryModal from './StoryModal';
import Toggle from '../common/Toggle';
import Image from 'next/image';
import { ArrowIcon } from '../icons/ArrowIcon';
import { Controller, useForm } from 'react-hook-form';
import useFairytailInfo from '@/hooks/useFairytailInfo';
import { themes } from '../edit/FairytailForm';
import { DropIcon } from '../icons/DropIcon';

type PageData = {
    image: string | null;
    story: string;
};

type FormData = {
    title: string;
    theme: string;
    cover: string | null;
    isPublic: boolean;
    pages: PageData[];
};

export default function Book() {
    const author: string = '도헌';
    // 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState<number>(0);
    // 로컬스토리지 데이터 불러오기
    const { title, theme, storys, isPublic } = useFairytailInfo();

    const { register, setValue, watch, handleSubmit, reset, control } =
        useForm<FormData>({
            defaultValues: {
                cover: null,
                theme: theme,
                isPublic: isPublic,
                pages:
                    storys.length > 0
                        ? storys.map((story) => ({ image: null, story: story }))
                        : [{ image: null, story: '' }]
            }
        });

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [storyModalOpen, setStoryModalOpen] = useState(false);
    const pages = watch('pages');
    const cover = watch('cover');
    const selectedTheme = watch('theme');
    const isPublicState = watch('isPublic');

    useEffect(() => {
        // Use data from useFairytailInfo to set form values
        reset({
            title,
            theme,
            cover,
            isPublic,
            pages: storys.map((story) => ({ image: null, story }))
        });
    }, [title, theme, storys, isPublic, reset]);

    useEffect(() => {
        // 주제 변경 시 특정 로직이 필요한 경우 여기에 추가
        console.log('Selected theme:', selectedTheme);
    }, [selectedTheme]);

    console.log(storys);
    console.log(pages);

    const onSubmit = (data: FormData) => {
        console.log(data);

        // 제출 로직
    };

    /**
     * handlePrevPage: 이전 페이지
     */
    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    /**
     * handleNextPage: 다음 페이지
     */
    const handleNextPage = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center">
                <div className="relative flex items-center">
                    <div className="absolute top-[34px] left-[270px]">
                        <DropIcon rotate="" />
                    </div>
                    <select
                        className="w-[280px] m-4 p-2 pl-1 border border-green-300 rounded-lg shadow focus:outline-none focus:border-2 appearance-none"
                        id="theme"
                        {...register('theme', { required: true })}
                        defaultValue={theme}
                    >
                        <option value="">주제를 선택해주세요.</option>
                        {themes.map(({ name }) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>

                    <p className="my-4 font-bold text-2xl">{title}</p>

                    <div className="absolute left-[700px] w-[48]"></div>

                    <div className="absolute left-[700px] w-[48]">
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
                    </div>
                    <button
                        type="submit"
                        className="ml-4 w-[60px] h-[36px] text-base bg-main rounded-md font-bold text-white hover:bg-green-600"
                    >
                        저장
                    </button>
                </div>

                <div className="flex justify-center items-center">
                    {/* 첫페이지면 화살표 작동 안함 */}
                    <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className=""
                    >
                        <ArrowIcon rotate="180" />
                    </button>
                    {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                    <div className="w-[40px] h-[600px] flex items-end justify-end mr-2">
                        <div className="text-lg font-bold">
                            {currentPage === 0
                                ? '표지 뒷면'
                                : currentPage + currentPage - 1}
                        </div>
                    </div>
                    <div className="w-[600px] h-[600px] border-2 flex justify-center items-center">
                        {/* 만약 페이지가 0이면 북 커버를 보여줘야 함 API 호출은 나중에 */}
                        {currentPage === 0 ? (
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(true)}
                                className={`flex justify-center items-center group relative w-[300px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300`}
                            >
                                {cover ? (
                                    <Image
                                        src={cover}
                                        width={300}
                                        height={300}
                                        alt="bookCover"
                                    />
                                ) : (
                                    <div className="w-[300px] h-[300px] flex flex-col items-center justify-center">
                                        <Image
                                            src={'/images/BiImageAlt.svg'}
                                            width={200}
                                            height={200}
                                            alt="defaultBookCover"
                                        />
                                        <p>클릭해서 이미지 생성</p>
                                    </div>
                                )}
                                <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                    클릭하면 이미지 생성이 가능합니다.
                                </div>
                            </button>
                        ) : (
                            // 만약 페이지가 0이아니라면 각페이지에 동화 이미지를 넣는다.
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(true)}
                                className={`flex justify-center items-center group relative w-[600px] h-[600px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300`}
                            >
                                {pages[currentPage - 1]?.image ? (
                                    <Image
                                        src={pages[currentPage - 1].image!}
                                        width={600}
                                        height={600}
                                        alt="Page Image"
                                    />
                                ) : (
                                    <div className="flex flex-col">
                                        <Image
                                            src={'/images/BiImageAlt.svg'}
                                            width={300}
                                            height={300}
                                            alt="default Page Image"
                                        />
                                        <p>클릭해서 이미지 생성</p>
                                    </div>
                                )}
                                <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                    클릭하면 이미지 생성이 가능합니다.
                                </div>
                            </button>
                        )}
                    </div>
                    {/* 책의 제목과 지은이 꿈틀 로고 들어감 */}
                    <div className="w-[60px] h-[600px] border-2 flex flex-col justify-between items-center">
                        <p className="texto mt-10 text-xl">{title}</p>
                        <p className="texto text-lg">{author} 지음</p>
                        <Image
                            src={'/images/logo.svg'}
                            alt="logo"
                            width={50}
                            height={50}
                            className="mb-10"
                        />
                    </div>
                    <div className="flex w-[600px] h-[600px] border-2 justify-center">
                        {/* page가 0이면 표지이며 표지에 관련된 내용이 나와야 한다. */}
                        {currentPage === 0 ? (
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => setImageModalOpen(true)}
                                    className={`relative flex justify-center items-center group w-[600px] h-[500px] bg-[#D9D9D9] rounded-[2px] text-main font-bold hover:opacity-60 hover:bg-gray-300 overflow-hidden`}
                                >
                                    {cover ? (
                                        <div className="">
                                            <Image
                                                src={cover}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="bookCover"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Image
                                                src={'/images/BiImageAlt.svg'}
                                                width={300}
                                                height={300}
                                                alt="Default BookCover"
                                            />
                                            <p>클릭해서 이미지 생성</p>
                                        </div>
                                    )}
                                    <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md">
                                        클릭하면 이미지 생성이 가능합니다.
                                    </div>
                                </button>
                                <p className="text-3xl font-bold mt-2">
                                    {title}
                                </p>
                                <p className="text-sm mt-4">{author} 지음</p>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setStoryModalOpen(true)}
                                className="group flex justify-center items-center w-[600px] h-[600px] border font-bold p-2 hover:opacity-60 hover:bg-gray-300 "
                            >
                                <div className="w-[400px] text-lg">
                                    {pages[currentPage - 1]?.story}
                                </div>
                                <div className="p-2 mt-2 invisible group-hover:visible absolute text-white bg-gray-600 rounded-md ">
                                    클릭하면 내용 편집이 가능합니다.
                                </div>
                            </button>
                        )}
                    </div>
                    {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                    <div className="w-[40px] h-[600px] flex items-end justify-start ml-2">
                        <div className="text-lg font-bold">
                            {currentPage === 0
                                ? '표지 앞면'
                                : currentPage + currentPage}
                        </div>
                    </div>
                    {/* 마지막 페이지 일 시 넘기는 버튼 뜨지 않는다. */}

                    <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === pages.length}
                    >
                        <ArrowIcon rotate="0" />
                    </button>
                </div>
            </div>
            {imageModalOpen && (
                <ImageModal
                    onClose={() => setImageModalOpen(false)}
                    onImageSelect={(image) => {
                        if (currentPage === 0) {
                            setValue('cover', image);
                        } else {
                            setValue(`pages.${currentPage - 1}.image`, image);
                        }
                        setImageModalOpen(false);
                    }}
                />
            )}
            {storyModalOpen && (
                <StoryModal
                    initialText={pages[currentPage - 1]?.story || ''}
                    onClose={() => setStoryModalOpen(false)}
                    onSave={(story) => {
                        setValue(`pages.${currentPage - 1}.story`, story);
                        setStoryModalOpen(false);
                    }}
                />
            )}
        </form>
    );
}
