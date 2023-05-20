import { createClient } from 'redis';
import {NextResponse} from "next/server";

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect()

export async function GET() {
    const start = new Date();
    const value = await client.xRange('OPTIONS:test:STREAM', '-', '+');
    const endDate = new Date()
    const end = endDate.getTime() - start.getTime()
    console.log(end)
    return NextResponse.json({value, end, start, endDate})
}

export const dynamic = 'force-static';
