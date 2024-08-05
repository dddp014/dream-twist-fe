/**
File Name : compoenents/book-preview/AiModal
Description : 이미지 첨부에서 ai 사용 시
Author : 임도헌

History
Date        Author   Status    Description
2024.07.26  임도헌   Created
2024.08.01  임도헌   Modified  AI 모달 기능 추가
*/

import Portal from '../common/Portal';
import Image from 'next/image';

interface AiModalProps {
    onClose: () => void;
    handleAiUpload: (image: File) => void;
    initialText: string;
}

export default function AiModal({
    onClose,
    handleAiUpload,
    initialText
}: AiModalProps) {
    // const [image, setImage] = useState<string | null>(null);
    const handleSubmit = () => {
        //     if (image) {
        //         handleAiUpload(image);
        //     }
        onClose();
    };

    return (
        <Portal>
            <div className="fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 z-10 bg-black bg-opacity-50">
                <div className="w-full max-w-[900px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8">
                    <button onClick={onClose} className="ml-[800px] mt-[20px]">
                        <Image
                            src={'/images/cancleIcon.svg'}
                            width={40}
                            height={40}
                            alt="cancle"
                        />
                    </button>

                    <div className="font-bold text-xl mb-4">
                        <p>
                            생성된 줄거리를 참고하여 원하는 장면을 적어주세요.
                        </p>
                        <p>AI가 그림을 생성합니다.</p>
                    </div>

                    <div className="flex bg-green-200 w-full h-[300px] rounded-xl justify-between items-center p-8 mb-8 font-bold resize-none overflow-auto focus:outline-none focus:border-none">
                        {initialText}
                    </div>

                    <input
                        placeholder="여기에 원하는 장면들 단어로 끊어서 적어주세요."
                        className="bg-yellow-200 w-full h-[40px] rounded-lg mb-4 p-4"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className=" px-6 py-2 bg-main text-white rounded-md mb-10"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
