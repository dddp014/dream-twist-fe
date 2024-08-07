/**
File Name : app/(fairytale)/final-edit/(fairytaleId)/page
Description : 동화책 미리보기 및 편집 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌   Created
2024.07.27  임도헌   Modified  Portal기술 적용
2024.07.30  임도헌   Modified  jotai 적용
2024.07.31  임도헌   Modified  react-hook-form으로 코드 변경 및 portal 위치 변경(app/layout.tsx로 옮김)
2024.08.07  임도헌   Modified  페이지 명 및 폴더 위치 변경
2024.08.07  임도헌   Modified  동적 메타데이터 추가
*/

import Book from '@/components/final-edit/Book';
import { Metadata } from 'next';

interface IEditParams {
    params: { fairytaleId: number };
}

// 동적 메타데이터 생성 함수
export async function generateMetadata({
    params
}: {
    params: { fairytaleId: string };
}): Promise<Metadata> {
    const fairytaleId = parseInt(params.fairytaleId, 10);
    const response = await fetch(
        `http://localhost:4000/fairytale/${fairytaleId}`
    );
    const data = await response.json();
    const title = data[0].title;

    return {
        title: `꿈틀 동화 최종 수정 - ${title}`,
        description: `동화 '${title}'를 최종 수정하세요 - 꿈틀 프로젝트`
    };
}

export default function BookPreviewPage({
    params: { fairytaleId }
}: IEditParams) {
    return (
        <div>
            <Book fairytaleId={fairytaleId} />
        </div>
    );
}
