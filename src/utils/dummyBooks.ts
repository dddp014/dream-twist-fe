export interface Book {
    id: number;
    title: string;
    author: string;
}

export const dummyBooks = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `뽀로로와 지구온난화 ${i + 1}`,
    author: `김민규 작가 ${i + 1}`
}));
