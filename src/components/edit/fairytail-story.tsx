/**
File Name : components/edit/fairytail-story
Description : 동화 내용 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌   Created
2024.07.24  임도헌   Modified  Toggle 컴포넌트 분리
*/
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Toggle from '../common/Toggle';

export default function FairytailStory() {
    const [isClick, setIsClick] = useState(0);
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
    const value =
        '내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 내용 어쩌고 저쩌고 ';

    const handleClick = (idx: number) => {
        setIsClick(idx);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <form
            action=""
            onSubmit={handleSubmit}
            className="w-8/12 m-4 mt-24 p-2 pl-1 border border-green-300 rounded-lg shadow"
        >
            <div className="flex justify-end">
                <Toggle />
                <button className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base">
                    저장
                </button>
                <Link
                    href={''}
                    className="bg-main py-2 px-4 ml-2 rounded-[7px] text-white cursor-pointer text-base"
                >
                    다음 단계
                </Link>
            </div>
            <div
                key={0}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 0 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(0);
                }}
            >
                <p className="w-full text-3xl font-bold">01</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300 m"></div>
                <textarea
                    required
                    name="story-0"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 0 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={1}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 1 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(1);
                }}
            >
                <p className="text-3xl font-bold">02</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-1"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 1 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={2}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 2 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(2);
                }}
            >
                <p className="text-3xl font-bold">03</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-2"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 2 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
            <div
                key={3}
                className={`m-4 rounded-lg p-4 hover:border hover:bg-green-100 hover:border-green-300 active:bg-green-200
                    ${isClick === 3 ? 'bg-green-100 border border-green-200' : ''}`}
                onClick={() => {
                    handleClick(3);
                }}
            >
                <p className="text-3xl font-bold">04</p>
                <div className="w-full my-[1%] border-[1px] border-lightGray-300"></div>
                <textarea
                    required
                    name="story-3"
                    className={`resize-none h-[200px] w-full overflow-auto focus:outline-none focus:border-none hover:bg-green-100 active:bg-green-200
                    ${isClick === 3 ? 'bg-green-100 border-green-200' : ''}`}
                >
                    {value}
                </textarea>
            </div>
        </form>
    );
}
