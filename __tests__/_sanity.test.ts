import { expect } from 'chai';
import { describe, it, jest } from '@jest/globals';
import job from '../app';

describe('Sanity Tests Suite', () => {
  jest.setTimeout(1000 * 60 * 2);

  it('App Stop', async () => {
    const testJob = await job;
    expect(testJob.running).to.be.true;

    await testJob.stop();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(testJob.running).to.be.false;
  });
});
