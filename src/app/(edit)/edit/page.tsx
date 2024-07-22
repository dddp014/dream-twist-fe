/**
File Name : app/edit/page
Description : 동화 편집 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
*/

import FairytailInfo from '@/components/edit/fairytail-info';
import FairytailStory from '@/components/edit/fairytail-story';

export default function EditPage() {
    return (
        <div className="flex w-full">
            <FairytailInfo />
            <FairytailStory />
        </div>
    );
}
