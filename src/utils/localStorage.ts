/**
File Name : utils/localStorage
Description : 로컬 스토리지 사용하는 함수
Author : 임도헌

History
Date        Author   Status    Description
2024.07.30   임도헌  Create
*/

// 데이터 타입을 명시적으로 지정
// T? 코드에 선언한 타입을 변수화 하고, 나중에 타입을 정하는 식으로 유연하게 사용이 가능
export function saveToLocalStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
    }
}

export function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value) as T;
        }
    } catch (error) {
        console.error(`Error loading from localStorage: ${error}`);
    }
    return null;
}
