/**
File Name : app/(fairytale)/edit/[fairytaleId]/page
Description : 동화 편집 페이지
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
2024.07.22  임도헌   Modified  동화 편집 페이지 추가
2024.07.25  임도헌   Modified  FairytaleInfo 컴포넌트 삭제
2024.08.07  임도헌   Modified  fairytaleForm 컴포넌트에 props 추가
2024.08.07  임도헌   Modified  동적 메타데이터 추가
*/

import FairytailForm from '@/components/edit/FairytailForm';
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
        title: `꿈틀 동화 수정 - ${title}`,
        description: `동화 '${title}'를 수정하세요 - 꿈틀 프로젝트`
    };
}

export default function EditPage({ params: { fairytaleId } }: IEditParams) {
    return (
        <div className="flex w-full">
            <FairytailForm fairytaleId={fairytaleId} />
        </div>
    );
}
