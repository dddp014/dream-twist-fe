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
                용감한 고양이 미미의 모험
            </div>
            <p className="m-4 text-2xl">주제 및 줄거리</p>
            <div className="m-4 p-2 pl-1 border border-green-300 rounded-lg shadow">
                작은 마을의 고양이 마을에는 모두가 사랑하는 용감한 고양이 미미가
                살고 있어요. 어느 날, 마을에 나쁜 악당 쥐들이 나타나서 마을을
                어지럽히기 시작했어요. 미미는 마을을 지키기 위해 용감하게
                나서기로 결심했어요. 미미는 친구들과 함께 악당 쥐들을 물리치기
                위한 계획을 세우고, 그 과정에서 많은 어려움을 겪게 돼요. 하지만
                미미는 포기하지 않고 끝까지 싸워 마침내 악당 쥐들을 물리치게
                되는데... 과연 미미는 어떻게 마을을 지킬 수 있을까요?
            </div>
        </div>
    );
}
