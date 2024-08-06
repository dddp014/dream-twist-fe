/**
File Name : app/(fairytale)/create/page
Description : 동화 생성 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
2024.07.25  임도헌   Modified  FairytailInfo 컴포넌트 삭제
2024.08.07  임도헌   Modified  페이지 명 변경
*/

import FairytailForm from '@/components/edit/FairytailForm';

export default function CreatePage() {
    return (
        <div className="flex w-full">
            <FairytailForm />
        </div>
    );
}
