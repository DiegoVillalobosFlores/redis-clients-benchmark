import { createClient } from 'redis';
import fastify from "fastify";

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

const server = fastify();

// Declare a route
server.get('/', async (request, reply) => {
    const start = new Date();
    const value = await client.xRange('OPTIONS:test:STREAM', '-', '+');
    const endDate = new Date()
    const end = endDate.getTime() - start.getTime()
    console.log(end)
    return {value, end, start, endDate}
})

// Run the server!
const start = async () => {
    try {
        await client.connect();

        await client.set('key', 'value');
        await server.listen({ port: 3001 })
        console.log('Listening in port 3001')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

