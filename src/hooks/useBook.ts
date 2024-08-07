/**
File Name : hooks/useBook
Description : Book 컴포넌트에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.05  임도헌   Modified  ai이미지는 url이고 파일인 경우에만 s3 요청하는 코드로 변경
2024.08.07  임도헌   Modified  localstorage 폼 제출 시 삭제하는 코드 적용
2024.08.07  임도헌   Modified  fairytaleId가 있으면 수정으로 아니라면 생성할 수 있게 코드 예외처리
2024.08.07  임도헌   Modified  커버가 ai로 생성했을 경우 url 이기 때문에 예외처리 적용
2024.08.07  임도헌   Modified  뒤로가기 버튼 경고 추가
*/

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookForm } from '@/hooks/useBookForm';
import {
    fetchPresignedURL,
    submitBookForm,
    updateBookForm,
    uploadFileToS3
} from '@/api/BookApi';
import { useBookModal } from './useModal';
import { removeFromLocalStorage } from '@/utils/localStorage';

export type CreationMethod = 'default' | 'upload' | 'ai' | 'palette';

export const useBook = (fairytaleId?: number) => {
    // 페이지 이동(메인페이지)
    const router = useRouter();
    // 임시 유저아이디 1
    const userId: number = 1;
    // 임시 작가 이름
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
        theme,
        nickname
    } = useBookForm(fairytaleId);

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
        if (data.cover && typeof data.cover !== 'string') {
            coverUrl = await UploadImageToS3(data.cover, 0);
        } else {
            coverUrl = data.cover;
        }
        // 파일이면 파일형식으로 아니면 그대로 리턴
        const imageUploadPromises = Object.keys(images).map((key, index) => {
            if (images[key] && typeof images[key] !== 'string') {
                return UploadImageToS3(images[key] as File, index);
            } else {
                return Promise.resolve(images[key]);
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
            if (fairytaleId) {
                const result = await updateBookForm(formdata, fairytaleId);
                if (result.statusCode === 400) {
                    alert(result.message);
                } else {
                    alert('동화가 성공적으로 수정되었습니다.');
                    // 동화 생성 후 로컬스토리지 값 삭제
                    removeFromLocalStorage('title');
                    removeFromLocalStorage('theme');
                    removeFromLocalStorage('storys');
                    removeFromLocalStorage('isPublic');
                    router.push('/');
                }
            } else {
                const result = await submitBookForm(formdata);
                if (result.statusCode === 400) {
                    alert(result.message);
                } else {
                    alert('동화가 성공적으로 저장되었습니다.');
                    // 동화 생성 후 로컬스토리지 값 삭제
                    removeFromLocalStorage('title');
                    removeFromLocalStorage('theme');
                    removeFromLocalStorage('storys');
                    removeFromLocalStorage('isPublic');
                    router.push('/');
                }
            }
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
    const handleImageSelect = (fileOrUrl: File | string) => {
        if (currentPage === 0) {
            setValue('cover', fileOrUrl);
        } else {
            const updatedPages = [...pages];
            updatedPages[currentPage - 1].image = fileOrUrl;
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

    const handleBackButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const confirmationMessage =
            '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
        if (!window.confirm(confirmationMessage)) {
            event.preventDefault();
        } else {
            router.push(`/edit/${fairytaleId}`);
        }
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
        nickname,
        handlePrevPage,
        handleNextPage,
        handleImageSelect,
        handleStoryChange,
        updateCreationWay,
        onSubmit,
        handleBackButtonClick
    };
};
