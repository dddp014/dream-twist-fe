/**
File Name : components/edit/fairytail-info
Description : 동화 제목 및 줄거리 컴포넌트
Author : 임도헌

History
Date        Author   Status    Description
2024.07.22  임도헌    Created
*/

export default function FairytailInfo() {
    return (
        <div className="max-w-xs mt-8 ml-8">
            <p className="m-4 text-2xl">제목</p>
            <div className="m-4 p-2 pl-1 border border-green-300 rounded-lg shadow">
                어쩌고 저쩌고 제목
            </div>
            <p className="m-4 text-2xl">주제 및 줄거리</p>
            <div className="m-4 p-2 pl-1 border border-green-300 rounded-lg shadow">
                어쩌고 저쩌고 줄거리 어쩌고 저쩌고 줄거리 어쩌고 저쩌고 줄거리
                어쩌고 저쩌고 줄거리 어쩌고 저쩌고 줄거리어쩌고 저쩌고
                줄거리어쩌고 저쩌고 줄거리어쩌고 저쩌고 줄거리어쩌고 저쩌고
                줄거리어쩌고 저쩌고 줄거리어쩌고 저쩌고 줄거리
            </div>
        </div>
    );
}
