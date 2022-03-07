import { expect } from 'chai';
import {
  describe, it, jest, beforeEach, afterEach,
} from '@jest/globals';
import * as fs from 'fs';
import * as sinon from 'sinon';
import * as redis from 'redis';
import { CronService, RedisService } from '../services/index';

describe('Cron Service Tests Suite', () => {
  describe('Scenarios', () => {
    jest.setTimeout(1000 * 40);

    let redisClient;

    beforeEach(async () => {
      const fakeRedisClient = {
        on: () => undefined,
        connect: () => undefined,
        get: async () => 1646692905925,
        set: async () => 'OK',
        disconnect: async () => undefined,
      };

      sinon
        .stub(redis, 'createClient').callsFake(() => fakeRedisClient as any);

      sinon
        .stub(fs, 'readdir').yields(undefined, ['1000.bulk', '1001.bulk']);

      sinon
        .stub(fs, 'stat').yields(undefined, {
          mtimeMs: 1646692905925,
        });

      const redisService = new RedisService();
      redisClient = await redisService.initiate();
    });

    afterEach(async () => {
      sinon.restore();
      await redisClient.disconnect();
    });

    it('Start Cron Job', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1, 2);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 4000));
      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('New Feed', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1, 2);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 4000));
      // @ts-ignore
      fs.stat.restore();
      sinon
        .stub(fs, 'stat').yields(undefined, {
          mtimeMs: new Date().getTime(),
        });

      await new Promise((resolve) => setTimeout(resolve, 4000));

      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    it('Default Crone Start and Stop', async () => {
      const cronService = new CronService();
      const job = cronService.initiateFeedLogsCronJob(1);
      job.then((job) => job.start());
      await new Promise((resolve) => setTimeout(resolve, 4000));
      expect(await job).to.have.property('running').true;
      job.then((job) => job.stop());
      expect(await job).to.have.property('running').false;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
  });
});
