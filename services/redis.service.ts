import { createClient } from 'redis';
import 'dotenv/config';

// set the path to the file feeds folder
const REDIS_URL: string = process.env.REDIS || 'redis://localhost:6379';

export default class RedisService {
  initiate = (async () => {
    const client = createClient({ url: REDIS_URL });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    return {
      set: (key: string, value: string) => client.set(key, value),
      get: (key: string) => client.get(key),
    };
  });
}
