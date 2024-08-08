/**
File Name : board/BookInfo
Description : 동화 게시판 - 정보
Author : 나경윤

History
Date        Author   Status    Description
2024.08.08  나경윤    Created
2024.08.08  나경윤    Modified  동화 타이틀 부분 분리
*/

'use client';

import { useEffect, useState } from 'react';
import { getBookDetail } from '@/api/BoardApi';
import { postBookView } from '@/api/BoardApi';
import EditDeleteBtn from './EditDeleteBtn';
import BookLike from './BookLike';
import RenderBook from './RenderBook';

export default function BookInfo({ id }: string) {
    const [bookInfo, setBookInfo] = useState({
        nickname: '',
        title: '',
        likes: '',
        views: ''
    });
    const [bookImages, setBookImages] = useState([]);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchView = async () => {
            try {
                const data = await postBookView(id);
                console.log('조회요청', data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchMyBook = async () => {
            try {
                const data = await getBookDetail(id);
                setBookInfo({
                    nickname: data[0].nickname,
                    title: data[0].title,
                    likes: data[0].likes,
                    views: data[0].views
                });
                console.log('세부', data);

                const coverImg = data[0].coverImage;
                const images = data[0].images.map((item) => item);
                const imageData = [coverImg, ...images];
                const contentData = Object.values(data[0].content);

                setBookImages(imageData);
                setContents(contentData);

                console.log('이미지', imageData);
                console.log('내용', contentData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyBook();
        fetchView();
    }, []);

    return (
        <>
            <div className="relative flex flex-col w-full mb-4">
                <div className="flex flex-row justify-center items-center mb-3 m-auto">
                    <p className="text-2xl font-semibold">{bookInfo.title}</p>
                    <p className="text-[17px] ml-5">{bookInfo.nickname} 작가</p>
                    <div className="flex flex-row items-center absolute right-0 bottom-14">
                        <EditDeleteBtn id={id} modalType="book" />
                    </div>
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="flex flex-row mt-2 justify-between">
                    <p className="text-gray-500 text-[14px]">
                        조회 {bookInfo.views}
                    </p>
                    <div className="self-end">
                        <BookLike id={id} likeCount={bookInfo.likes} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center">
                <RenderBook
                    bookImages={bookImages}
                    contents={contents}
                    info={bookInfo}
                />
            </div>
        </>
    );
}
