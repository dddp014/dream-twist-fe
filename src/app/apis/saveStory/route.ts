import { NextApiRequest, NextApiResponse } from 'next';

// 예를 들어 메모리 기반 저장소를 사용하는 코드
const stories: Record<string, any> = {};

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id, story } = req.body;
        stories[id] = story;
        res.status(200).json({ success: true });
    } else if (req.method === 'GET') {
        const { id } = req.query;
        const story = stories[id as string];
        if (story) {
            res.status(200).json(story);
        } else {
            res.status(404).json({ error: 'Story not found' });
        }
    } else {
        res.status(405).end();
    }
};
