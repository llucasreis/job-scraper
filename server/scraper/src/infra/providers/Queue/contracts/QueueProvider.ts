export interface Job {
  name: string;
  data: object;
}

export default interface QueueProvider {
  addJob(job: Job): Promise<void>;
  process(): Promise<void>;
}
