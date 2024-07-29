/**
File Name : app/edit/page
Description : 동화 편집 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
2024.07.25  임도헌   Modified  FairytailInfo 컴포넌트 삭제
*/

import FairytailForm from '@/components/edit/FairytailForm';

export default function EditPage() {
    return (
        <div className="flex w-full">
            <FairytailForm />
        </div>
    );
}
