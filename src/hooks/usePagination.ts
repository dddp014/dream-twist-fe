import { useState } from 'react';

const usePagination = () => {
    const [step, setStep] = useState(0); // 0은 초기 화면, 1은 Step1 화면

    const handleStartClick = () => {
        setStep(1);
    };

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    return {
        step,
        setStep,
        handleStartClick,
        nextStep,
        prevStep
    };
};

export default usePagination;
