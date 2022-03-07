import { expect } from 'chai';
import {
  describe, it, jest,
} from '@jest/globals';
import * as fs from 'fs';
import * as sinon from 'sinon';

import { FeedsService } from '../services/index';
import 'dotenv/config';

// set the path to the file feeds folder
const FEED_DIR: string = process.env.RECEIVED_DIR || 'c:/tmp/feeds';
// set the id of the customers include the suffix in a comma separated string without spaces
const CUSTOMERS_ID_ARR_AS_STR: string = process.env.CUSTOMERS_ID_ARR_AS_STR || '1000.bulk,1001.bulk,1010.bulk';

describe('Feeds Service Tests Suite', () => {
  describe('Positive', () => {
    it('GET Files From Feeds', async () => {
      sinon
        .stub(fs, 'readdir').yields(undefined, ['1000.bulk', '1001.bulk']);

      sinon
        .stub(fs, 'stat').yields(undefined, {
          mtimeMs: new Date().getTime(),
        });

      const feedsService = new FeedsService();
      const setResponse = await feedsService.getFilesFeedDateAsync(FEED_DIR, CUSTOMERS_ID_ARR_AS_STR.split(','));
      sinon.restore();
      expect(setResponse).to.have.lengthOf.above(1);
      expect(setResponse).to.have.property('0').to.have.property('FileName').to.include('.bulk');
    });
  });

  describe('Negative', () => {
    jest.setTimeout(1000 * 60 * 2);
    it('Readdir Error', async () => {
      const feedsService = new FeedsService();

      let errorMessage;
      try {
        await feedsService.getFilesFeedDateAsync('c:/test/empty', CUSTOMERS_ID_ARR_AS_STR.split(','));
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).to.include('Readdir Error: ENOENT: no such file or directory, scandir \'c:\\test\\empty\'');
    });

    it('No Files Found Error', async () => {
      const feedsService = new FeedsService();
      fs.mkdirSync(`${FEED_DIR}/test`);

      let errorMessage;
      try {
        await feedsService.getFilesFeedDateAsync(`${FEED_DIR}/test`, CUSTOMERS_ID_ARR_AS_STR.split(','));
      } catch (error) {
        fs.rmSync(`${FEED_DIR}/test`, { recursive: true, force: true });
        errorMessage = error.message;
      }
      expect(errorMessage).to.include('filesNams Error, No Files Found: []');
    });

    it('FS Stat Error (Mock)', async () => {
      sinon
        .stub(fs, 'stat').yields({ message: 'Test_Stat_Error' }, undefined);

      const feedsService = new FeedsService();

      let errorMessage;
      try {
        await feedsService.getFilesFeedDateAsync(`${FEED_DIR}`, CUSTOMERS_ID_ARR_AS_STR.split(','));
      } catch (error) {
        errorMessage = error.message;
      }
      sinon.restore();
      expect(errorMessage).to.include('Error: Stat Error: Test_Stat_Error');
    });
  });
});
