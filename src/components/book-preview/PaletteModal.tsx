/**
File Name : compoenents/book-preview/PaletteModal
Description : 그림판 모달
Author : 임도헌

History
Date        Author   Status      Description
2024.07.24  임도헌   Created
2024.07.27  임도헌   Modified     portal 적용
2024.07.29  임도헌   Modified   필요없는 코드 삭제
2024.07.30  임도헌   Modified     스타일 적용
2024.08.01  임도헌   Modified    portal 수정 및 코드 리팩토링
*/

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Portal from '../common/Portal';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const CANVAS_LINE = 5;

interface PaletteModalProps {
    onClose: () => void;
    onDrawingComplete: (image: string) => void;
}

export default function PalleteModal({
    onClose,
    onDrawingComplete
}: PaletteModalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [isFilling, setIsFilling] = useState(false);
    const [lineWidth, setLineWidth] = useState(0);
    const [color, setColor] = useState('#000000');

    const colorOptions = [
        '#FF0000',
        '#FF6B00',
        '#FFE500',
        '#22F400',
        '#000000',
        '#0085FF',
        '#3C0F9C',
        '#BD00FF',
        '#FF70D7',
        '#FFFFFF'
    ];

    // 초기 선 굵기 세팅
    useEffect(() => {
        setLineWidth(CANVAS_LINE);
    }, []);

    // 선 굵기와 색이 변경되면 색과 굵기 변경한다.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                // context 설정
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
                context.strokeStyle = color;
                context.fillStyle = color;
                context.fillStyle = 'white';
                context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                // context 상태 저장
                setCtx(context);
            }
        }
    }, [lineWidth, color]);

    /**
     * handleMouseMove: 마우스 좌표를 이용해서 선 그리는 함수
     * @description 마우스 누른 상태면 isPainting이 true가 되므로 선 그리기가 된다.
     */
    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPainting && ctx) {
            ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            ctx.stroke();
        }
    };

    /** handleMouseDown: 마우스 누른 상태
     * @description 마우스를 누른 상태면 isPainting이 true가 된다. 이 상태를 이용해서 handleMouseMove를 사용한다.
     */
    const handleMouseDown = () => {
        if (ctx) {
            setIsPainting(true);
            ctx.beginPath();
        }
    };

    /** handleMouseUp: 마우스 뗀 상태
     * @description 마우스를 떼면 isPainting이 false가 된다. 이 상태를 이용해서 handleMouseMove가 작동하지 않는다.
     */
    const handleMouseUp = () => {
        setIsPainting(false);
        if (ctx) {
            ctx.beginPath();
        }
    };

    /** handleLineWidthChange: 선 굵기 변화를 감지 */
    const handleLineWidthChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLineWidth(Number(event.target.value));
    };

    /** handleColorChange: 색 변화를 감지 */
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    /** handleModeClick: 펜모드와 채우기 모드 체크 */
    const handleModeClick = () => {
        setIsFilling(!isFilling);
    };

    /** handleModeClick: 채우기 모드일때 */
    const handleCanvasFillClick = () => {
        if (isFilling && ctx) {
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    };

    /** handleClearClick: 그림판 초기화 기능
     *  @description 캔버스 화면을 하얀색으로 채우는 방식으로 구현
     */
    const handleClearClick = () => {
        if (window.confirm('정말 그림을 지우시겠습니까?')) {
            if (ctx) {
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
        }
    };

    /** handleEraserClick: 지우개 기능
     *  @description 하얀색 펜으로 지우는 기능 제공 만약 채우기 모드일때는 펜모드로 바꾼다.
     */
    const handleEraserClick = () => {
        setColor('white');
        setIsFilling(false);
    };

    /** handleFileClick: 파일 인풋 버튼으로 커스텀
     *  @description file input 없애고 지정한 버튼에 file input 연결시킨다.
     */
    const handleFileClick = () => {
        fileInputRef?.current?.click();
    };

    /** handleFileChange: 이미지 첨부 기능
     *  @description 파일을 url로 바꾸고 img 태그 생성해서 src 넣어주는 방식 넣어준 뒤 value 초기화 시켜서 다른
     * 페이지에 이미지 첨부시 기존 파일 초기화 시켜줘야 다시 넣기 가능
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && ctx) {
            const url = URL.createObjectURL(file);
            const image = document.createElement('img');
            image.src = url;
            image.onload = () => {
                ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                URL.revokeObjectURL(url);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset file input after image load
                }
            };
        }
    };

    /** handleDoubleClick: 글씨 넣기 기능
     *  @description 현재 상태를 저장 후 선 굵기 1로 세팅, 폰트 세팅, 텍스트 넣은 뒤 기존 상태 다시 불러온다.
     */
    const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const text = textInputRef.current?.value;
        if (text && ctx) {
            ctx.save();
            ctx.lineWidth = 1;
            ctx.font = '68px Arial'; // Use Arial as 'pretendard' may not be available
            ctx.fillText(
                text,
                event.nativeEvent.offsetX,
                event.nativeEvent.offsetY
            );
            ctx.restore();
        }
    };

    /** handleDrawingComplete: 글씨 넣기 기능
     *  @description 저장 버튼 시 현재 이미지 데이터를 form으로 보낸다.
     */
    const handleDrawingComplete = () => {
        if (canvasRef.current) {
            const url = canvasRef.current.toDataURL();
            onDrawingComplete(url);
        }
    };

    return (
        <Portal>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[900px] bg-white rounded-lg shadow-lg p-6 z-50">
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="focus:outline-none"
                    >
                        <Image
                            src="/images/cancleIcon.svg"
                            width={40}
                            height={40}
                            alt="cancel"
                        />
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex h-[66px] space-x-4 mb-4">
                        <button
                            className="p-4 bg-gray-200 rounded-md flex-none"
                            onClick={handleModeClick}
                        >
                            {isFilling ? (
                                <Image
                                    src="/images/Brush.svg"
                                    width={36}
                                    height={36}
                                    alt="brush"
                                />
                            ) : (
                                <Image
                                    src="/images/paint.svg"
                                    width={36}
                                    height={36}
                                    alt="paint"
                                />
                            )}
                        </button>
                        <button
                            className="p-4 bg-gray-200 rounded-md flex-none"
                            onClick={handleEraserClick}
                        >
                            <Image
                                src="/images/Eraser.svg"
                                width={36}
                                height={36}
                                alt="eraser"
                            />
                        </button>
                        <div className="flex items-center flex-none">
                            <input
                                className="w-[200px] accent-main"
                                type="range"
                                min="1"
                                max="10"
                                value={lineWidth}
                                step="0.1"
                                onChange={handleLineWidthChange}
                            />
                        </div>
                        <div className="flex items-center w-[250px] flex-none">
                            <input
                                type="color"
                                value={color}
                                onChange={handleColorChange}
                                className="w-[50px] h-10 border-none mr-4"
                            />
                            <div className="grid grid-cols-5 gap-5">
                                {colorOptions.map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 rounded-lg border-[1px]"
                                        style={{ backgroundColor: color }}
                                        onClick={() => {
                                            setColor(color);
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex h-[66px] space-x-4">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button
                                className="p-4 bg-gray-200 rounded-md flex-none"
                                type="button"
                                onClick={handleFileClick}
                            >
                                <Image
                                    src="/images/PalettePicture.svg"
                                    width={36}
                                    height={36}
                                    alt="picture"
                                />
                            </button>
                        </div>
                        <button
                            onClick={handleClearClick}
                            className="p-4 bg-gray-200 rounded-md flex-none"
                        >
                            <Image
                                src="/images/Outline.svg"
                                width={36}
                                height={36}
                                alt="clear"
                            />
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <canvas
                        className="border-2 border-gray-300 m-4"
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onClick={handleCanvasFillClick}
                        onDoubleClick={handleDoubleClick}
                    />
                </div>
                <div className="flex justify-around">
                    <div>
                        <input
                            type="text"
                            placeholder="텍스트를 입력해주세요"
                            ref={textInputRef}
                            className="w-[200px] border p-2 rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleDrawingComplete}
                        className="px-4 py-2 bg-main text-white rounded-md flex-none"
                    >
                        저장
                    </button>
                </div>
            </div>
        </Portal>
    );
}
