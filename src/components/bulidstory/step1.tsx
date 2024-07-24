/**
File Name : components/step1
Description : 동화 생성 첫번째 단계
Author : 김민규

History
Date        Author   Status    Description
2024.07.21  김민규    Created
*/

'use client';

type Step1Props = {
    nextStep: () => void;
};

function Step1({ nextStep }: Step1Props) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">
                떠오르는 스토리를 자유롭게 적어주세요.
            </h1>
            <p className="text-center mb-8">
                꿈틀이 적은 내용을 토대로 줄거리를 만들어드려요.
            </p>
            <div className="bg-white p-6 mx-auto w-2/3">
                <textarea
                    className="w-full h-72 p-4 rounded-md bg-main-100 resize-none mb-2 focus:outline-none"
                    placeholder="동화책의 내용을 적어주세요."
                ></textarea>
                <p className="mt-4 text-gray-700">
                    예시1) 소피아가 신비로운 마법의 숲을 탐험하며 친구들과 함께
                    숲을 지켜내는 이야기
                    <br />
                    예시2) 동물친구들 - 꼬마거북 핀과 친구들이 연이 친구 코아와
                    함께 온갖 모험을 떠난다.
                    <br />
                    예시3) 최선임양을 주인공과 고양이를 주인공으로 그린 이야기나
                    인형의 무한모험의 줄거리
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={nextStep}
                        className="mt-10 bg-main text-white py-2.5 px-6 rounded-md"
                    >
                        줄거리 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step1;
