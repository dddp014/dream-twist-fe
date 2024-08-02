/**
File Name : components/step2
Description : 동화 생성 두번째 단계
Author : 김민규

History
Date        Author   Status    Description
2024.07.21  김민규    Created
*/

'use client';

import { useModal } from '@/hooks/useModal'; // useModal 훅을 불러옵니다.
import Modal from '@/components/bulidstory/modal';

type Step2Props = {
    nextStep: () => void;
    prevStep: () => void;
};

const Step2 = ({ nextStep, prevStep }: Step2Props) => {
    const { isModalOpen, plot, openModal, closeModal, savePlot } =
        useModal(`오늘은 비가 많이 오는 날, 창밖을 바라보니 모두들 우산을
        쓰고 있어요. 지우는 학교에 가는 길에 우산을 잃어버려
        걱정이 많았어요. 하지만 비가 많이 오니 라다 보니,
        평소에는 보지 못했던 작은 것들을 발견하게 돼요. 빗방울이
        떨어지는 소리, 물방울이에서 뛰어오르는 물방울, 그리고
        비에 젖은 나무와 꽃들. 그러던 중 지우는 놀이터에서
        우산을 쓰지 않고 비를 맞으며 춤추는 아이를 발견해요. 그
        아이는 바로 같은 반 친구인 민호였어요. 민호는 지우에게
        비 오는 날의 특별한 비밀을 알려주겠다고 해요. 과연 그
        비밀은 무엇일까요?`);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">
                민규 작가님이 적은 내용으로 줄거리를 만들었어요.
            </h1>
            <p className="text-center mb-8">
                AI와 함께 줄거리를 수정하면서 원하는 내용으로 바꿔 보아요.
            </p>
            <div className="flex justify-center gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                    <h2 className="text-xl font-bold mb-2">제목</h2>
                    <p>비 오는 날의 비밀</p>
                    <h2 className="text-xl font-bold mb-2">장르</h2>
                    <p>동화</p>
                    <h2 className="text-xl font-bold mb-2">배경</h2>
                    <p>현대 도시의 한 초등학교와 그 주변</p>
                    <h2 className="text-xl font-bold mb-2">주제</h2>
                    <p>작은 일상 속에서 발견하는 특별한 순간</p>
                    <h2 className="text-xl font-bold mb-2">주인공</h2>
                    <p>지우</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                    <h2 className="text-xl font-bold mb-2">줄거리</h2>
                    <p>{plot}</p>
                </div>
            </div>
            <div className="flex justify-between mt-8">
                <div>
                    <button
                        onClick={prevStep}
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    >
                        이전 단계
                    </button>
                    <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                        onClick={openModal}
                    >
                        줄거리 수정
                    </button>
                </div>
                <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded"
                    onClick={nextStep}
                >
                    선택한 줄거리로 동화 생성
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={savePlot}
                currentPlot={plot}
            />
        </div>
    );
};

export default Step2;
