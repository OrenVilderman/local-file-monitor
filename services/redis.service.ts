import { createClient } from 'redis';
import 'dotenv/config';

export default class RedisService {
  // set the path to the file feeds folder
  REDIS_URL: string = process.env.REDIS_URL || 'redis://localhost:6379';

  initiate = async () => {
    const client = createClient({ url: this.REDIS_URL });

    client.on('error', (error) => {
      console.log('Redis Client Error', error);
      throw new Error(`Redis Client Error: ${error}`);
    });

    await client.connect();
    return {
      set: (key: string, value: string) => client.set(key, value),
      get: (key: string) => client.get(key),
      del: (key: string) => client.del(key),
      disconnect: () => client.disconnect(),
    };
  };
}
