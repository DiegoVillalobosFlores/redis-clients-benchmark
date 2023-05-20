import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');

const server = Bun.serve({
    port: 3001,
    fetch: async (req) => {
        const start = new Date();
        const value = await client.xRange('OPTIONS:test:STREAM', '-', '+');
        const endDate = new Date()
        const end = endDate.getTime() - start.getTime()
        console.log(end)
        return new Response(JSON.stringify({end, start, endDate, value}));
    },
});

console.log(`Listening on http://localhost:${server.port}...`);