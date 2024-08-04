/**
File Name : hooks/useCanvas
Description : usePaletteModal에서 사용하는 훅
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
*/

import { useRef, useState, useEffect } from 'react';

const CANVAS_WIDTH: number = 600;
const CANVAS_HEIGHT: number = 600;
const CANVAS_LINE: number = 5;

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [isFilling, setIsFilling] = useState<boolean>(false);
    const [lineWidth, setLineWidth] = useState<number>(0);
    const [color, setColor] = useState<string>('#000000');

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

    useEffect(() => {
        setLineWidth(CANVAS_LINE);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
                context.strokeStyle = color;
                context.fillStyle = color;
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
    const handleDrawingComplete = (
        handleDrawingUpload: (image: File) => void
    ) => {
        if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'drawing.png', {
                        type: 'image/png'
                    });
                    handleDrawingUpload(file);
                }
            });
        }
    };

    return {
        canvasRef,
        fileInputRef,
        textInputRef,
        ctx,
        color,
        isFilling,
        lineWidth,
        colorOptions,
        setColor,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        handleLineWidthChange,
        handleColorChange,
        handleModeClick,
        handleCanvasFillClick,
        handleClearClick,
        handleEraserClick,
        handleFileClick,
        handleFileChange,
        handleDoubleClick,
        handleDrawingComplete
    };
};
