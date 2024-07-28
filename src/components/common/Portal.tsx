/**
File Name : common/Portal
Description : 모달 쓸때 포탈 사용해서 최상위에 렌더링(부모 컴포넌트 바깥에 렌더링)
Author : 임도헌

History
Date        Author   Status    Description
2024.07.27  임도헌    Created
*/

import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactElement }) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (typeof window === 'undefined') return <></>;

    return mounted ? (
        createPortal(
            children,
            document.getElementById('modal-root') as HTMLElement
        )
    ) : (
        <></>
    );
}
