/**
File Name : common/LoadingSpinner
Description : fetch 쓸때 데이터 불러오기전 로딩중 컴포넌트 동적으로 보여주기 위해서 돌아가는 것 사용
Author : 임도헌

History
Date        Author   Status    Description
2024.08.05  임도헌    Created
*/

import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #34db5e;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
