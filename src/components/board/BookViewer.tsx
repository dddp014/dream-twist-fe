/**
File Name : board/BookViewer
Description : 동화 게시판 - 동화 뷰어 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤   Created
*/

import Image from 'next/image';
import NextArrow from '../../assets/images/next-arrow.svg';
import Sample1 from '../../assets/images/sample1.svg';

export default function BookViewer() {
    return (
        <div className="flex flex-row w-full h-3/6 justify-center items-center mb-10">
            <div
                className="border-solid border border-gray-200 w-4/12 h-full ml-14 bg-[length:100%_100%] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Sample1.src})` }}
            >
                {' '}
            </div>
            <button type="button">
                <Image src={NextArrow} alt="next-arrow" className="ml-8" />
            </button>
        </div>
    );
}
