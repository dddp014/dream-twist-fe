'use client';

import React from 'react';

function error({ error }: { error: Error }) {
    console.log(error);
    return <div>에러가 발생 했습니다..</div>;
}

export default error;
