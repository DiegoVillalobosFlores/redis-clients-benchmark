import Redis from 'ioredis';

const client = new Redis();
client.on('error', err => console.log('Redis Client Error', err));
import {NextResponse} from "next/server";

client.on('error', err => console.log('Redis Client Error', err));

export async function GET() {
    const start = new Date();
    const value = await client.xrange('OPTIONS:test:STREAM', '-', '+');
    const endDate = new Date()
    const end = endDate.getTime() - start.getTime()
    console.log(end)
    return NextResponse.json({value, end, start, endDate})
}

export const dynamic = 'force-dynamic';
