/**
File Name : hooks/useBook
Description : Book 컴포넌트에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
*/

import { useState } from 'react';
import { useBookForm } from '@/hooks/useBookForm';
import {
    fetchPresignedURL,
    submitBookForm,
    uploadFileToS3
} from '@/api/BookApi';
import { useBookModal } from './useModal';

export type CreationMethod = 'default' | 'upload' | 'ai' | 'palette';

export const useBook = () => {
    // 임시 유저아이디 1
    const userId: number = 1;
    // 임시 작가 이름
    const author: string = '도헌';
    // 모달 상태
    const { setImageModalOpen, setStoryModalOpen } = useBookModal();

    // react hook form 분리
    const {
        register,
        setValue,
        handleSubmit,
        control,
        pages,
        cover,
        title,
        theme
    } = useBookForm();

    // 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState<number>(0);
    // 어떤 방식으로 이미지 생성됐는지 체크
    const [creationWays, setCreationWays] = useState<string[]>(
        Array(7).fill('default')
    );

    // 이미지 생성 상태 배열에 업데이트(초기값: default)
    const updateCreationWay = (index: number, method: CreationMethod) => {
        setCreationWays((prevCreationWays) => {
            const newCreationWays = [...prevCreationWays];
            newCreationWays[index] = method;
            return newCreationWays;
        });
    };

    // 배열 전체 고려해서 모든 이미지가 한가지 방법으로 생성 시 그 방법 리턴
    // 아니라면 mix를 리턴
    function getCreationWayStatus(creationWay: string[]): string {
        // 배열이 비어있는 경우를 처리
        if (creationWay.length === 0) return 'default';
        // 중복 제거해서 집합으로 처리
        const uniqueWays = new Set(creationWay);
        // 유일한 생성 방식이 하나만 있는 경우우
        if (uniqueWays.size === 1) {
            // 'default', 'ai', 'upload', 'palette' 중 하나
            const singleWay = uniqueWays.values().next().value;
            return singleWay;
        }
        // 생성 방식이 여러 개가 섞여 있는 경우
        return 'mix';
    }

    const UploadImageToS3 = async (file: File, index: number) => {
        try {
            const { presignedURL } = await fetchPresignedURL(userId, file.name);
            console.log(`Presigned URL: ${presignedURL}`);
            const fileUrl = await uploadFileToS3(presignedURL, file);
            console.log(`파일 업로드 성공 -> s3 url: ${fileUrl}`);
            return fileUrl;
        } catch (error) {
            console.error('파일 업로드 에러:', error);
            throw error;
        }
    };

    const onSubmit = async (data: any) => {
        // 폼 데이터를 백엔드에 보낼수 있게 객체로 변환
        const content: { [key: string]: string } = {};
        const images: { [key: string]: File | null } = {};

        // 객체로 반복 돌려서 리턴한다.
        data.pages.forEach((page: any, index: number) => {
            const key = (index + 1).toString();
            if (page.story) content[key] = page.story;
            images[key] = page.image;
        });
        // 커버 이미지 AWS S3로 보내서 url로 변환
        let coverUrl = null;
        if (data.cover) {
            coverUrl = await UploadImageToS3(data.cover, 0);
        }
        //
        const imageUploadPromises = Object.keys(images).map((key, index) => {
            if (images[key]) {
                return UploadImageToS3(images[key], index);
            } else {
                return Promise.resolve(null);
            }
        });

        // 병렬로 처리
        const imageUrls = await Promise.all(imageUploadPromises);
        // 이미지를 백엔드로 보낼 수 있게 객체로 변환
        const imageUrlsObject: { [key: string]: string | null } = {};
        imageUrls.forEach((url, index) => {
            imageUrlsObject[(index + 1).toString()] = url;
        });

        const formdata = new FormData();
        // formdata.append('userid', String(userId));
        formdata.append('title', String(data.title));
        formdata.append('theme', String(data.theme));
        formdata.append('content', JSON.stringify(content));
        formdata.append('privatedAt', String(data.isPublic));
        formdata.append(
            'creationWay',
            String(getCreationWayStatus(creationWays))
        );
        formdata.append('coverImage', String(coverUrl));
        formdata.append('images', JSON.stringify(imageUrlsObject));

        try {
            const result = await submitBookForm(formdata);
            console.log(result);
            alert('동화가 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('Error:', error);
        }
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

    // 이미지 선택 시 표지면 커버로 아니라면 그 페이지에 이미지파일 세팅
    const handleImageSelect = (file: File) => {
        if (currentPage === 0) {
            setValue('cover', file);
        } else {
            const updatedPages = [...pages];
            updatedPages[currentPage - 1].image = file;
            setValue('pages', updatedPages);
        }
        setImageModalOpen(false);
    };

    // 스토리 수정시 현재 페이지에 스토리 변경
    const handleStoryChange = (story: string) => {
        const updatedPages = [...pages];
        updatedPages[currentPage - 1].story = story;
        setValue('pages', updatedPages);
        setStoryModalOpen(false);
    };

    return {
        register,
        handleSubmit,
        control,
        pages,
        cover,
        title,
        theme,
        currentPage,
        author,
        handlePrevPage,
        handleNextPage,
        handleImageSelect,
        handleStoryChange,
        updateCreationWay,
        onSubmit
    };
};
