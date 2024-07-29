/**
File Name : components/step3
Description : 동화 생성 세번째 단계
Author : 김민규

History
Date        Author   Status    Description
2024.07.22  김민규    Created  
2024.07.22  김민규    Modified  페이지 슬라이드 기능 추가    
*/

'use client';

import { useState } from 'react';

type Step3Props = {
    prevStep: () => void;
};

const plots = [
    "오늘은 비가 많이 오는 날이었어요. 지우는 창밖을 바라보며 모두가 우산을 쓰고 있는 모습을 보았어요. 학교에 가기 위해 짐을 나서던 지우는 깜짝 놀랐어요. 우산을 잃어버렸거든요. '어떻게 하지?' 지우는 걱정이 많았어요. 하지만 어쩔 수 없이 비를 맞으며 걷기 시작했어요.",
    "비를 맞으며 걷다 보니, 지우는 평소에는 보지 못했던 작은 것들을 발견하게 되었어요. 빗방울이 떨어지는 소리가 마치 작은 음악회처럼 들렸어요. '빗방울 소리가 이렇게 아름다울 줄이야!' 지우는 놀라며 생각했어요.",
    "지우는 길가에 있는 물웅덩이를 보았어요. 빗방울이 물웅덩이에 떨어지며 물방울이 튀어 오르는 모습이 마치 춤을 추는 것 같았어요. '이렇게 재미있는 광경을 놓치다니!' 지우는 웃으며 물웅덩이를 지나갔어요.",
    "오늘은 비가 많이 오는 날이었어요. 지우는 창밖을 바라보며 모두가 우산을 쓰고 있는 모습을 보았어요. 학교에 가기 위해 짐을 나서던 지우는 깜짝 놀랐어요. 우산을 잃어버렸거든요. '어떻게 하지?' 지우는 걱정이 많았어요. 하지만 어쩔 수 없이 비를 맞으며 걷기 시작했어요.",
    "비를 맞으며 걷다 보니, 지우는 평소에는 보지 못했던 작은 것들을 발견하게 되었어요. 빗방울이 떨어지는 소리가 마치 작은 음악회처럼 들렸어요. '빗방울 소리가 이렇게 아름다울 줄이야!' 지우는 놀라며 생각했어요.",
    "지우는 길가에 있는 물웅덩이를 보았어요. 빗방울이 물웅덩이에 떨어지며 물방울이 튀어 오르는 모습이 마치 춤을 추는 것 같았어요. '이렇게 재미있는 광경을 놓치다니!' 지우는 웃으며 물웅덩이를 지나갔어요."
];

function Step3({ prevStep }: Step3Props) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < plots.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold text-center mb-4">
                줄거리를 토대로 11p 플롯을 생성했어요.
            </h1>
            <p className="text-center mb-8">
                동화책 각 페이지에 들어갈 이야기를 수정할 수 있어요.
            </p>
            <div className="flex overflow-x-auto w-full space-x-4">
                {plots.map((plot, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 w-full max-w-xs bg-white p-6 rounded-lg shadow-md`}
                    >
                        <h2 className="text-xl font-bold mb-2 text-center">
                            {index + 1}
                        </h2>
                        <p className="text-center">{plot}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-8">
                <div>
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                        onClick={prevStep}
                    >
                        이전 단계
                    </button>
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded ml-2">
                        플롯 수정
                    </button>
                </div>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                    이 플롯으로 완료
                </button>
            </div>
        </div>
    );
}

export default Step3;
