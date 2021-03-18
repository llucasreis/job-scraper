import JobInfoDTO from '../dtos/JobInfoDTO';

export default interface CrawlerProvider {
  searchJobs(): Promise<JobInfoDTO[]>;
}
