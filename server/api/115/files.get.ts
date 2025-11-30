import { defineEventHandler, getQuery, getHeaders, readBody, createError } from 'h3';

// 辅助函数：将数组分成指定大小的小块
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export default defineEventHandler(async (event) => {
    // --- 1. 请求转发逻辑 (保持不变) ---
    const path = event.node.req.url ?? '';
    const query = getQuery(event);
    const method = event.node.req.method || 'GET';
    const body = method !== 'GET' && method !== 'HEAD' ? await readBody(event) : undefined;

    const newPath = path.replace('/api/115', '');
    const domain = 'https://webapi.115.com';
    const targetUrl = `${domain}${newPath}`;

    const requestHeaders = getHeaders(event);
    const headersToForward = {
        ...requestHeaders,
        host: undefined,
    };

    // try {
    const response: string = await $fetch(targetUrl, {
        method: method as 'GET' | 'POST' | 'PUT',
        headers: headersToForward,
        query: query,
        body: body,
    });

    const result = JSON.parse(response);

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
        console.log('API 返回数据为空，不执行数据库插入。');
        return result;
    }

    const db = hubDatabase();
    const insertSql = `
        INSERT OR IGNORE INTO jav (code, fid, cid, pc, play_long, te, n) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const chunks = chunkArray(result.data, 100);
    console.log(`数据分成 ${chunks.length} 批次，每批次最多 100 条记录。`);

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`正在插入第 ${i + 1} / ${chunks.length} 批次，共 ${chunk.length} 条记录...`);

        const statements = chunk.map(item => {
            const code = item.n.match(/([a-zA-Z]{2,}-?\d{2,})/)?.[1];
            return db.prepare(insertSql).bind(code, item.fid, item.cid, item.pc, item.play_long, item.te, item.n);
        });
        await db.batch(statements);
    }
    console.log('所有数据批次插入完成。');

    return result;
});