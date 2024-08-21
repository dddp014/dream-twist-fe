/**
File Name : hooks/usePageLeaveCheck
Description : 페이지 새로고침 또는 뒤로가기 하기 전에 유저가 체크하는 커스텀 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.07  임도헌   Created
2024.08.07  임도헌   Modified  usePageLeaveCheck 새로고침 추가
2024.08.07  임도헌   Modified  usePageLeaveCheck 페이지 뒤로가기 추가
2024.08.09  임도헌   Modified  뒤로가기 오류 수정
*/

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const usePageLeaveCheck = () => {
    const router = useRouter();
    const isBackNavigation = useRef(false); // 뒤로가기 여부를 추적하는 상태

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ''; // 대부분의 브라우저에서 작동하는 방식
        };

        const handlePopState = (e: PopStateEvent) => {
            const confirmationMessage =
                '작성하던 내용이 모두 사라집니다. 계속하시겠습니까?';

            if (isBackNavigation.current) {
                isBackNavigation.current = false; // 한 번 트리거된 후 초기화
                return;
            }

            if (!window.confirm(confirmationMessage)) {
                e.preventDefault();
                window.history.pushState(null, '', window.location.href);
            } else {
                isBackNavigation.current = true;
                router.back();
            }
        };

        // 특정 URL 경로에서만 경고창을 띄우도록 설정
        const path = window.location.pathname;
        if (
            path.startsWith('/edit') ||
            path.startsWith('/final-edit') ||
            path.startsWith('/edit/') ||
            path.startsWith('/final-edit/')
        ) {
            window.addEventListener('beforeunload', handleBeforeUnload);
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);
};

export default usePageLeaveCheck;
