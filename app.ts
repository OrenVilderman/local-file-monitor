import { CronService } from './services/index';

const cronService = new CronService();

const job = cronService.initiateFeedLogsCronJob(1, 6);
job.then((job) => job.start());

// Use for Unit Tests
export default job;
