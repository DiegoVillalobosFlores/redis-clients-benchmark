import { Hono } from 'hono'
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');

const app = new Hono()
app.get('/', async (c) => {
	const start = new Date();
	const value = await client.xRange('OPTIONS:test:STREAM', '-', '+');
	const endDate = new Date()
	const end = endDate.getTime() - start.getTime()
	console.log(end)
	return c.json({value, end, start, endDate})
})

export default {
  port: 3001,
  fetch: app.fetch
}