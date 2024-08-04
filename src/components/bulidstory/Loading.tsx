/**
File Name : components/buildstory/Loading
Description : 동화 생성 과정 중 로딩 창
Author : 김민규

History
Date        Author   Status    Description
2024.08.02  김민규    Created
2024.08.04  김민규    Created   로딩 에니메이션 추가
*/

import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <div className="loader mb-4"></div>{' '}
                {/* 로딩 애니메이션을 추가 */}
                <p className="text-lg font-bold text-center">
                    멋진 동화를 만들고 있어요
                </p>
                <p className="text-lg font-bold text-center">
                    조금만 기다려주세요!...
                </p>
                <div className="mt-4">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-green-600 bg-green-100">
                                동화가 만들어지는데 약 15초~20초의 시간이 걸려요
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
