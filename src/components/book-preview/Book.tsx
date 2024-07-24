/**
File Name : book-preview/Book
Description : 동화 편집 - 스토리를 책 모양으로 볼 수 있고 편집도 가능한 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.23  임도헌    Created
2024.07.23  임도헌    Modified 모달기능 추가 및 코드 리팩토링
*/

'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextArrow from '../../assets/images/next-arrow.svg';
import PrevArrow from '../../assets/images/prev-arrow.svg';
import Logo from '../../assets/images/logo.svg';
import ImageModal from './ImageModal';
import StoryModal from './StoryModal';
import Toggle from '../common/Toggle';

export default function Book() {
    const bookName: string = '용감한 고양이 미미의 모험';
    const author: string = '도헌';
    const story: string[] = [
        "작은 마을의 고양이 마을에는 모두가 사랑하는 용감한 고양이 미미가 살고 있었어요. 미미는 하얀 털과 큰 파란 눈을 가진 아름다운 고양이였어요. 마을의 모든 고양이들은 미미를 좋아했어요. 왜냐하면 미미는 언제나 친절하고 용감했기 때문이에요. 어느 날, 마을에 나쁜 악당 쥐들이 나타나서 마을을 어지럽히기 시작했어요. 쥐들은 마을의 음식을 훔치고, 고양이들을 괴롭히며, 마을을 혼란에 빠뜨렸어요. 미미는 이 상황을 보고 마음이 아팠어요. '내가 마을을 지켜야 해요,' 미미는 결심했어요.",
        "미미는 친구들과 함께 악당 쥐들을 물리치기 위한 계획을 세우기로 했어요. 미미의 가장 친한 친구는 검은 털을 가진 고양이 루루였어요. 루루는 빠르고 민첩했어요. 그리고 회색 털을 가진 고양이 토토도 있었어요. 토토는 매우 똑똑해서 좋은 아이디어를 많이 냈어요. 미미는 친구들에게 말했어요, '우리 모두 힘을 합쳐서 마을을 지켜요!' 친구들은 미미의 용기에 감동했고, 함께 힘을 모으기로 했어요.",
        "미미와 친구들은 먼저 마을을 둘러보며 쥐들이 어디에 숨어 있는지 알아보기로 했어요. 루루는 높은 나무 위로 올라가 마을을 내려다보며 쥐들의 움직임을 관찰했어요. 토토는 마을의 구석구석을 돌아다니며 쥐들이 자주 다니는 길을 찾아냈어요. 미미는 친구들이 발견한 정보를 모아 계획을 세웠어요. '쥐들이 자주 다니는 길목에 함정을 설치해요,' 미미는 말했어요. 친구들은 미미의 계획에 따라 함정을 준비하기 시작했어요.",
        "함정을 설치하는 동안 미미와 친구들은 서로를 격려하며 힘을 냈어요. 루루는 나무에서 내려와 함정을 설치하는 데 도움을 주었고, 토토는 함정의 위치를 정확하게 정했어요. 미미는 친구들이 잘 하고 있는지 확인하며, 필요한 도움을 주었어요. '우리는 할 수 있어요,' 미미는 친구들에게 말했어요. 친구들은 미미의 말을 듣고 더 열심히 일했어요. 함정이 완성되자, 미미와 친구들은 쥐들이 함정에 빠지기를 기다렸어요.",
        '밤이 되자, 쥐들이 마을로 돌아왔어요. 쥐들은 아무것도 모른 채 함정이 설치된 길을 따라 걸어갔어요. 갑자기 쥐들이 함정에 빠지기 시작했어요. 쥐들은 놀라서 도망치려고 했지만, 이미 늦었어요. 미미와 친구들은 쥐들을 잡기 위해 재빨리 움직였어요. 루루는 빠르게 쥐들을 쫓아갔고, 토토는 쥐들이 도망가지 못하게 길을 막았어요. 미미는 쥐들을 하나씩 잡아 안전한 곳으로 옮겼어요.',
        "쥐들을 모두 잡은 후, 미미와 친구들은 마을 고양이들에게 쥐들을 어떻게 처리할지 상의했어요. 마을의 어른 고양이들은 미미와 친구들의 용감한 행동을 칭찬했어요. '미미, 너희는 정말 용감해요,' 어른 고양이들이 말했어요. 미미는 부끄러워하며 말했어요, '모두가 함께 했기 때문에 가능했어요.' 어른 고양이들은 쥐들을 마을 밖으로 내보내기로 결정했어요. 쥐들은 다시는 마을에 돌아오지 않겠다고 약속했어요.",
        "쥐들이 마을을 떠난 후, 마을은 다시 평화를 되찾았어요. 모든 고양이들은 미미와 친구들에게 감사했어요. 미미는 친구들과 함께 마을을 돌아다니며, 고양이들이 잘 지내고 있는지 확인했어요. '우리가 마을을 지켰어요,' 미미는 친구들에게 말했어요. 친구들은 미미의 말에 고개를 끄덕였어요. '정의는 반드시 승리해요,' 미미는 다시 한 번 다짐했어요.",
        "미미와 친구들은 마을의 평화를 지키기 위해 항상 경계를 늦추지 않았어요. 그들은 정기적으로 마을을 순찰하며, 이상한 일이 생기지 않도록 주의했어요. 미미는 친구들과 함께 마을의 안전을 지키기 위해 항상 노력했어요. '우리는 언제나 함께 있어요,' 미미는 친구들에게 말했어요. 친구들은 미미의 말에 동의하며, 서로를 믿고 의지했어요.",
        "어느 날, 마을에 새로운 고양이 가족이 이사 왔어요. 그들은 미미와 친구들에게 인사하며, 마을에 잘 적응할 수 있도록 도와달라고 부탁했어요. 미미와 친구들은 기쁜 마음으로 새로운 고양이 가족을 도와주었어요. '우리는 모두 친구예요,' 미미는 새로운 고양이들에게 말했어요. 새로운 고양이 가족은 미미와 친구들의 친절함에 감동했어요.",
        "미미와 친구들은 새로운 고양이 가족과 함께 마을을 돌아다니며, 마을의 규칙과 중요한 장소들을 소개했어요. 그들은 함께 시간을 보내며, 서로를 알아갔어요. 미미는 새로운 친구들과 함께 마을을 지키기 위한 계획을 세우며, 더 많은 친구들과 함께 할 수 있어서 기뻤어요. '우리는 모두 함께해요,' 미미는 말했어요. 새로운 고양이 가족도 미미와 친구들에게 감사하며, 함께 마을을 지키기로 했어요.",
        "미미와 친구들은 마을의 평화를 지키기 위해 항상 노력했어요. 그들은 서로를 믿고 의지하며, 함께 어려움을 극복했어요. 미미는 친구들과 함께 마을을 지키며, 정의는 반드시 승리한다는 것을 다시 한 번 깨달았어요. '우리는 언제나 함께 있어요,' 미미는 친구들에게 말했어요. 친구들은 미미의 말에 고개를 끄덕이며, 함께 웃었어요. 작은 마을의 고양이 마을은 미미와 친구들 덕분에 언제나 평화롭고 행복했답니다."
    ];
    const pageCount: number = story.length;
    console.log(pageCount);
    const [page, setPage] = useState<number>(0);

    /**
     * handleNextPage: 다음 페이지
     */
    const handleNextPage = () => {
        setPage((page) => page + 1);
    };

    /**
     * handlePrevPage: 이전 페이지
     */
    const handlePrevPage = () => {
        setPage((page) => page - 1);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex items-center">
                <p className="my-4 font-bold text-2xl">{bookName}</p>
                <button className="ml-4 w-[60px] h-[36px] text-base bg-main rounded-md font-bold text-white">
                    저장
                </button>
                <div className="absolute left-[700px] w-[48]">
                    <Toggle />
                </div>
            </div>

            <div className="flex justify-center items-center">
                {/* 첫페이지가 아닌 경우 화살표 안뜨게 */}
                {page !== 0 && (
                    <button onClick={handlePrevPage} className="">
                        <Image src={PrevArrow} alt="prev-arrow" />
                    </button>
                )}
                {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                <div className="w-[40px] h-[600px] flex items-end justify-end mr-2">
                    <div className="text-lg font-bold">
                        {page === 0 ? '표지 뒷면' : page + page - 1}
                    </div>
                </div>
                <div className="w-[600px] h-[600px] border-2 flex justify-center items-center">
                    {/* 만약 페이지가 0이면 북 커버를 보여줘야 함 API 호출은 나중에 */}
                    <ImageModal page={page} width={300} />
                </div>
                {/* 책의 제목과 지은이 꿈틀 로고 들어감 */}
                <div className="w-[60px] h-[600px] border-2 flex flex-col justify-between items-center">
                    <p className="w-[20px] mt-10 text-lg font-bold">
                        {bookName}
                    </p>
                    <p className="w-[20px] text-lg">{author} 지음</p>
                    <Image src={Logo} alt="logo" width={50} className="mb-10" />
                </div>
                <div className="w-[600px] h-[600px] border-2 flex justify-center">
                    {/* page가 0이면 표지이며 표지에 관련된 내용이 나와야 한다. */}
                    {page === 0 ? (
                        <div className="flex flex-col items-center">
                            <ImageModal page={page} width={600} />
                            <p className="text-3xl font-bold mt-4">
                                {bookName}
                            </p>
                            <p className="text-sm mt-6">{author} 지음</p>
                        </div>
                    ) : (
                        // 아니라면 페이지에 해당하는 줄거리가 뜬다.
                        <StoryModal page={page} story={story} />
                    )}
                </div>
                {/* 첫페이지면 표지임. 아니면 표지가 아니라 페이지를 보여준다. */}
                <div className="w-[40px] h-[600px] flex items-end justify-start ml-2">
                    <div className="text-lg font-bold">
                        {page === 0 ? '표지 앞면' : page + page}
                    </div>
                </div>
                {/* 마지막 페이지 일 시 넘기는 버튼 뜨지 않는다. */}
                {page !== pageCount && (
                    <button onClick={handleNextPage}>
                        <Image src={NextArrow} alt="next-arrow" />
                    </button>
                )}
            </div>
        </div>
    );
}
