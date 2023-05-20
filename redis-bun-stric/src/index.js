import { App } from "@stricjs/core";
import Bun from "bun";
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');

// Create a new app and serve directly using Bun
const app = new App()
	// Add a middleware that responds to every request with "Hello"
	.use(async () => {
		const start = new Date();
		const value = await client.xRange('OPTIONS:test:STREAM', '-', '+');
		const endDate = new Date()
		const end = endDate.getTime() - start.getTime()
		console.log(end)
		return Response.json({value, end, start, endDate})
	})

app.port = 3001

Bun.serve(app)