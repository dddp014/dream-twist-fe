/**
File Name : hooks/useTextToImage
Description : 텍스트 -> 이미지 변환 hook
Author : 나경윤

History
Date        Author   Status    Description
2024.07.27  나경윤    Created
*/

import { useEffect, useRef } from 'react';

export default function useTextToImage(text: string) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        // 캔버스 크기 설정
        const canvasWidth = 400;
        const canvasHeight = 400;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // 텍스트 스타일 설정
        context.fillStyle = '#000000';
        context.font = '22px Hyemin';
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        // 텍스트 줄바꿈
        const wrapText = (text: string, maxWidth: number) => {
            let line = '';
            const lines = [];

            for (let i = 0; i < text.length; i++) {
                const contentLine = line + text[i];
                const metrics = context.measureText(contentLine);
                const contentWidth = metrics.width;

                // 현재 라인 넓이가 캔버스 넓이보다 크면 다음 줄로 넘어감
                if (contentWidth > maxWidth) {
                    lines.push(line);
                    line = text[i]; // 현재 문자를 새 줄의 처음으로 설정
                } else {
                    line = contentLine;
                }
            }

            // 마지막 줄 저장
            lines.push(line);

            return lines;
        };

        // 라인별로 문장 설정
        const allLines = wrapText(text, canvasWidth);
        const lineHeight = 35; // 줄 간격
        let y = 90; // 시작 위치

        // 텍스트 캔버스에 그리기
        allLines.forEach((line) => {
            context.fillText(line, 0, y);
            y += lineHeight;
        });
    }, [text]);

    return canvasRef;
}
