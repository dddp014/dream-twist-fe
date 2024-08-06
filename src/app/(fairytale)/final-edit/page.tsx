/**
File Name : app/edit/book-preview/page
Description : 동화책 미리보기 및 편집 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌   Created
2024.07.27  임도헌   Modified  Portal기술 적용
2024.07.30  임도헌   Modified  jotai 적용
2024.07.31  임도헌   Modified  react-hook-form으로 코드 변경 및 portal 위치 변경(app/layout.tsx로 옮김)
2024.08.07  임도헌   Modified  페이지 명 및 폴더 위치 변경

*/

import Book from '@/components/final-edit/Book';

export default function FinalEditPage() {
    return (
        <div>
            <Book />
        </div>
    );
}
