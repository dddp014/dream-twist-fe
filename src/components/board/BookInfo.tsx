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

export default function BookInfo({ id }: string) {
    // const [bookInfo, setBookInfo] = useState({
    //     nickname: '',
    //     profileImage: '',
    //     fairytaleCount: '',
    //     getLikesCount: '',
    //     points: ''
    // });

    useEffect(() => {
        const fetchMyBook = async () => {
            try {
                const data = await getBookDetail(id);
                // const myBookData = data.myFairytales.map((item) => ({
                //     ...item,
                //     createdAt: item.createdAt.split('T')[0]
                // }));
                console.log('세부', data);
                // setMyBooks(myBookData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyBook();
    }, []);

    return (
        <div className="relative flex flex-col w-full mb-4">
            {/* <div className="flex flex-row justify-center items-center mb-3 m-auto">
                <p className="text-2xl font-semibold">{data[0].title}</p>
                <p className="text-[17px] ml-5">{data[0].nickname} 작가</p>
                <div className="flex flex-row items-center absolute right-0 bottom-14">
                    <EditDeleteBtn id={id} modalType="book" />
                </div>
            </div>
            <hr className="border border-zinc-200 opacity-70" />
            <div className="flex flex-row mt-2 justify-between">
                <p className="text-gray-500 text-[14px]">
                    조회 {data[0].views}
                </p>
                <div className="self-end">
                    <BookLike id={id} likeCount={data[0].likes} />
                </div>
            </div> */}
        </div>
    );
}
