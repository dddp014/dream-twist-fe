/**
File Name : compoenents/book-preview/FileUploadModal
Description : 이미지 첨부에서 파일 업로드 시
Author : 임도헌

History
Date        Author   Status    Description
2024.07.26  임도헌    Created
*/

import React, { MutableRefObject, useRef, useState } from 'react';
import Image from 'next/image';
import { useEditModal } from '@/hooks/useModal';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ISecondModalProps {
    isSecondOpenModal: boolean;
    secondOpenModal: () => void;
    secondCloseModal: () => void;
}

interface IFormInput {
    file: File | null;
}

export default function FileUploadModal({
    closeModal
}: {
    closeModal: () => void;
}) {
    const { register, handleSubmit, reset, setValue } = useForm<IFormInput>({
        defaultValues: {
            file: null
        }
    });
    const trigger: MutableRefObject<null> = useRef(null);
    const modal: MutableRefObject<null> = useRef(null);

    const {
        isSecondOpenModal,
        secondOpenModal,
        secondCloseModal
    }: ISecondModalProps = useEditModal();

    const fileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>();

    const handleClick = () => {
        fileRef?.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        if (file) {
            const selectedImage: string = URL.createObjectURL(file);
            setImage(selectedImage);
            setValue('file', file); // Set the file value in the form
        }
    };

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (data.file) {
            const file = data.file;
            console.log('Selected file:', file.name);
            reset();
            secondCloseModal();
            closeModal();
        } else {
            console.error('No file selected');
        }
    };

    return (
        <>
            <button
                ref={trigger}
                onClick={() => {
                    secondOpenModal();
                }}
                className="flex flex-col w-[200px] h-[200px] bg-main rounded-lg justify-center items-center hover:bg-green-600"
            >
                <Image
                    src={'/images/pictureIcon.svg'}
                    width={100}
                    height={100}
                    alt="palette"
                />
                <p className="font-bold text-xl text-white">사진 첨부</p>
            </button>

            <div
                className={`fixed left-0 top-0 flex w-full h-full min-h-screen items-center justify-center bg-dark/90 z-10 ${
                    isSecondOpenModal ? 'block' : 'hidden'
                }`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        ref={modal}
                        onFocus={() => secondOpenModal()}
                        className="w-[900px] max-w-[920px] h-[472px] mb-[1px] rounded-lg bg-white text-center first-line: border-[1px] border-main px-8"
                    >
                        <button
                            type="button"
                            onClick={() => secondCloseModal()}
                            className="ml-[800px] mt-[20px]"
                        >
                            <Image
                                src={'/images/cancleIcon.svg'}
                                width={40}
                                height={40}
                                alt="cancle"
                            />
                        </button>
                        <label htmlFor="file">사진 첨부</label>
                        <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            {...register('file')}
                            ref={fileRef}
                            onChange={(e) => {
                                handleImageChange(e);
                                register('file').onChange(e);
                            }}
                        />
                        <button type="button" onClick={handleClick}>
                            +
                        </button>
                        <div>
                            <img src={image} width={100} height={100} alt="" />
                        </div>
                        <button type="submit">업로드</button>
                    </div>
                </form>
            </div>
        </>
    );
}
