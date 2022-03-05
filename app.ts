import { CronService } from './services/index';

const cronService = new CronService();

const job = cronService.initiateFeedLogsCronJob(1, 10);
job.then((job) => job.start());
