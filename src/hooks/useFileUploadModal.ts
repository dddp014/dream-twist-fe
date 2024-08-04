/**
File Name : hooks/useFileUploadModal
Description : useFileUploadModal에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
*/

import { useRef, useState } from 'react';

export const useFileUploadModal = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleClick = () => {
        fileRef?.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setImage(fileUrl);
            setSelectedFile(file);
        }
    };

    const handleSubmit = (onFileSelect: (file: File) => void) => {
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    return {
        fileRef,
        image,
        handleClick,
        handleFileChange,
        handleSubmit
    };
};
