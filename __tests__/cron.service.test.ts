import { expect } from 'chai';
import {
  describe, it, jest,
} from '@jest/globals';
import * as fs from 'fs';
import { CronService } from '../services/index';

// set the path to the file feeds folder
const FEED_DIR: string = process.env.RECEIVED_DIR || 'c:/tmp/feeds';
// set the id of the customers include the suffix in a comma separated string without spaces
const CUSTOMERS_ID_ARR_AS_STR: string = process.env.CUSTOMERS_ID_ARR_AS_STR || '1424.batch,4323.batch,1194.batch';

describe('Cron Service Tests Suite', () => {
  describe('Scenarios', () => {
    jest.setTimeout(1000 * 60 * 2);
    it('Start Cron Job', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1, 6);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 10000));
      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('New Feed', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1, 6);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 10000));

      fs.writeFileSync(`${FEED_DIR}/${CUSTOMERS_ID_ARR_AS_STR.split(',')[0]}`, 'New_Feed_Test');
      await new Promise((resolve) => setTimeout(resolve, 10000));

      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('Default Crone Start and Stop', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 5000));
      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
  });
});
