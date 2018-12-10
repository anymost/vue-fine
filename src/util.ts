import nanoId from 'nanoid';

const startId = nanoId();
let requestCount = 0;

export const generateUnionId = () => `${startId}_${requestCount++}`;
