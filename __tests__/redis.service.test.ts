import { expect } from 'chai';
import {
  describe, it, beforeEach, afterEach,
} from '@jest/globals';
import { RedisService } from '../services/index';
import 'dotenv/config';

describe('Redis Service Tests Suite', () => {
  describe('Positive', () => {
    let redisClient;

    beforeEach(async () => {
      const redisService = new RedisService();
      redisClient = await redisService.initiate();
    });

    afterEach(async () => {
      await redisClient.disconnect();
    });

    it('CRUD', async () => {
      const setResponse = await redisClient.set('Test', 'Pass');
      expect(setResponse).to.include('OK');
      const getResponse = await redisClient.get('Test');
      expect(getResponse).to.include('Pass');
      const updateResponse = await redisClient.set('Test', 'Updated');
      expect(updateResponse).to.include('OK');
      const getResponseAfterUpdate = await redisClient.get('Test');
      expect(getResponseAfterUpdate).to.include('Updated');
      const deleteResponse = await redisClient.del('Test');
      expect(deleteResponse).to.equal(1);
      const getResponseAfterDelete = await redisClient.get('Test');
      expect(getResponseAfterDelete).to.be.null;
    });
  });

  describe('Negative', () => {
    it('Wrong Redis URL', async () => {
      process.env.REDIS_URL = 'redis://localhost:404';
      const redisService = new RedisService();
      let errorMessage;
      try {
        await redisService.initiate();
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).to.include('Redis Client Error: Error: Redis Client Error: Error: connect ECONNREFUSED 127.0.0.1:404');
      delete process.env.REDIS_URL;
    });
  });
});
