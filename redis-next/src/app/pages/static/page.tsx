import styles from '../../page.module.css'
import Redis from 'ioredis';

const client = new Redis();
client.on('error', err => console.log('Redis Client Error', err));

client.on('error', err => console.log('Redis Client Error', err));


export default async function Home() {
    const start = new Date();
    const value = await client.xrange('OPTIONS:test:STREAM', '-', '+');
    const endDate = new Date()
    const end = endDate.getTime() - start.getTime()
    console.log(end)
    return (
        <main className={styles.main}>
            <h1>{end}</h1>
            {JSON.stringify(value)}
        </main>
    )
}

export const dynamic = 'force-static';
