/**
File Name : hooks/usePageLeaveCheck
Description : 페이지 새로고침 또는 뒤로가기 하기 전에 유저가 체크하는 커스텀 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.07  임도헌   Created
2024.08.07  임도헌   Modified  usePageLeaveCheck 새로고침 추가
2024.08.07  임도헌   Modified  usePageLeaveCheck 페이지 뒤로가기 추가
*/

import { useEffect } from 'react';

const usePageLeaveCheck = () => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue =
                '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
        };

        const handlePopState = (event: PopStateEvent) => {
            const confirmationMessage =
                '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';
            if (!window.confirm(confirmationMessage)) {
                event.preventDefault();
            } else {
                window.history.back();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // 초기 상태를 설정하여 popstate 이벤트를 트리거할 수 있도록 합니다.
        window.history.pushState(null, '', window.location.href);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
};

export default usePageLeaveCheck;
