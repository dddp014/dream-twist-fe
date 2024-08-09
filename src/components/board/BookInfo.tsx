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
import { getBookDetail, postBookView } from '@/api/BoardApi';
import { getMyLikeBook } from '@/api/MypageApi';
import EditDeleteBtn from './EditDeleteBtn';
import BookLike from './BookLike';
import RenderBook from './RenderBook';

interface LikeId {
    id: string;
}

export default function BookInfo({ id }: { id: string }) {
    const [bookInfo, setBookInfo] = useState({
        nickname: '',
        title: '',
        likes: '',
        views: '',
        privatedAt: ''
    });
    const [bookImages, setBookImages] = useState<string[]>([]);
    const [contents, setContents] = useState<string[]>([]);
    const [myLikeBooks, setMyLikeBooks] = useState<string[]>([]);
    const [userName, setUserName] = useState<string | null>(null);
    const [isPrivate, setIsPrivate] = useState<string>();

    useEffect(() => {
        const storedUserName = localStorage.getItem('nickname');
        setUserName(storedUserName);

        const fetchMyLikeBook = async () => {
            try {
                const data = await getMyLikeBook();
                const likeData = data.myLikes.map((item: LikeId) => item.id);
                setMyLikeBooks(likeData);
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
                    views: data[0].views,
                    privatedAt: data[0].privatedAt
                });

                console.log('전체', data);

                const coverImg = data[0].coverImage;
                const images = data[0].images.map((item: string) => item);
                const imageData = [coverImg, ...images];
                const contentData = Object.values(data[0].content) as string[];

                setBookImages(imageData);
                setContents(contentData);

                if (data[0].privatedAt === null || data[0].privatedAt === '') {
                    setIsPrivate('전체 공개');
                } else {
                    setIsPrivate('비공개');
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (storedUserName) {
            const fetchView = async () => {
                try {
                    await postBookView(id);
                } catch (error) {
                    // console.error(error);
                }
            };
            fetchView();
        }

        fetchMyLikeBook();
        fetchMyBook();
    }, [id]);

    const styleClass =
        isPrivate === '비공개'
            ? 'text-black bg-gray-300'
            : 'text-white bg-main-300';

    return (
        <>
            <div className="relative flex flex-col w-full mb-4">
                <div className="flex flex-row justify-center items-center mb-3 m-auto">
                    <div
                        className={`absolute left-0 bottom-14 font-Pretendard-100 rounded-[0.55rem] mb-0.5 ${styleClass} text-[0.9rem] px-2 py-[0.2rem]`}
                    >
                        <p>{isPrivate}</p>
                    </div>
                    <p className="text-2xl font-semibold">{bookInfo.title}</p>
                    <p className="text-[17px] ml-5">{bookInfo.nickname} 작가</p>
                    {userName === bookInfo.nickname && (
                        <div className="flex flex-row items-center absolute right-0 bottom-14">
                            <EditDeleteBtn id={id} modalType="book" />
                        </div>
                    )}
                </div>
                <hr className="border border-zinc-200 opacity-70" />
                <div className="flex flex-row mt-2 justify-between">
                    <p className="text-gray-500 text-[14px]">
                        조회 {bookInfo.views}
                    </p>
                    <div className="self-end">
                        <BookLike
                            id={id}
                            likeCount={bookInfo.likes}
                            mybooks={myLikeBooks}
                        />
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
