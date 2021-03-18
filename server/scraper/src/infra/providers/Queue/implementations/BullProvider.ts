import Queue from 'bull';
import redisConfig from '@config/redis';
import QueueProvider, { Job } from '../contracts/QueueProvider';

import * as jobs from '../jobs';

interface QueueData {
  queue: Queue.Queue;
  name: string;
  handle(data: unknown): Promise<void>;
}

export default class BullProvider implements QueueProvider {
  private queues: QueueData[];

  constructor() {
    this.queues = Object.values(jobs).map(job => ({
      queue: new Queue(job.key, {
        redis: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
      }),
      name: job.key,
      handle: job.handle,
    }));
  }

  async addJob({ name, data }: Job): Promise<void> {
    const queueData = this.queues.find(queue => queue.name === name);

    if (queueData) {
      console.log('Adding data');
      await queueData.queue.add(data);
    } else {
      console.error("Queue didn't found");
    }
  }

  async process() {
    return this.queues.forEach(queueData => {
      console.log('Starting to process');
      queueData.queue.process(queueData.handle);

      queueData.queue.on('failed', (job, err) => {
        console.log('Job failed', queueData.name, job.data);
        console.log(err);
      });
    });
  }
}
