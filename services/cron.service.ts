import 'dotenv/config';
import { CronJob } from 'cron';
import { FeedsService, RedisService } from './index';

// set the path to the file feeds folder
const FEED_DIR: string = process.env.RECEIVED_DIR || 'c:/tmp/feeds';
// set the id of the customers include the suffix in a comma separated string without spaces
const CUSTOMERS_ID_ARR_AS_STR: string = process.env.CUSTOMERS_ID_ARR_AS_STR || '1000.bulk,1001.bulk,1010.bulk';

export default class CronService {
  /**
       *
       * @param intervalTime set the interval of the cron job in minutes
       * @param intervalDebug this allow you to interval few times a minute by setting the intervalTime to 1 and then intervalDebug to the desired interval in seconds
       * @returns a CronJob that can be used with '.start' and '.stop'
       */
  async initiateFeedLogsCronJob(intervalTime: number, intervalDebug = 60) {
    console.log(`Cron Job Execution Set To Start Every: ${intervalTime} Minutes`);

    const feedsService = new FeedsService();
    const redisService = new RedisService();
    let isFeedMissing = false;

    return new CronJob(`1/${intervalDebug} */${intervalTime} * * * *`, (async (): Promise<void> => {
      feedsService.getFilesFeedDateAsync(FEED_DIR, CUSTOMERS_ID_ARR_AS_STR.split(',')).then(async (files) => {
        let isNewFeed = false;
        if (files instanceof Array) {
          const redisClient = await redisService.initiate();
          await Promise.all(files.map(async (file) => {
            if (file.FileName && file.LastUpdate) {
              const fileLastUpdate = await redisClient.get(file.FileName);
              if (new Date(fileLastUpdate).getTime() < new Date(file.LastUpdate.toString()).getTime()) {
                isNewFeed = true;
              }
              await redisClient.set(file.FileName, file.LastUpdate);
            }
          }));
          await redisClient.disconnect();
        }
        if (isNewFeed && isFeedMissing) {
          isFeedMissing = false;
          console.info('back to normal');
        } else if (!isNewFeed) {
          isFeedMissing = true;
          console.warn(`Warning: No new feed file received in the last ${intervalTime} or more minutes`);
        }
      });
    }));
  }
}
