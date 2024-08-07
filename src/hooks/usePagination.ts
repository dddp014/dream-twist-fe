'use client';

import { useState } from 'react';

const usePagination = () => {
    const [step, setStep] = useState(0);

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
