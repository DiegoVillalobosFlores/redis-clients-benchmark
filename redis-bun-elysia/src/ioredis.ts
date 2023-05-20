import { Elysia } from 'elysia'
import Redis from 'ioredis';

const client = new Redis();
client.on('error', err => console.log('Redis Client Error', err));

await client.set('key', 'value');

const app = new Elysia()
    .get('/', async () => {
        const start = new Date();
        const value = await client.xrange('OPTIONS:test:STREAM', '-', '+');
        const endDate = new Date()
        const end = endDate.getTime() - start.getTime()
        console.log(end)
        return {value, end, start, endDate}
    })
    .listen(3001)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
