import JobInfoDTO from '@infra/providers/Crawler/dtos/JobInfoDTO';

interface JobData {
  url: string;
  title: string;
}

interface JobsStructure {
  [key: string]: {
    [key: string]: JobData[];
  };
}

export default class ProcessJobHelper {
  static structureByCityAndDepartment(jobs: JobInfoDTO[]) {
    const jobsStructured: JobsStructure = {};

    jobs.forEach(job => {
      const { city, department, title, url } = job;
      if (!jobsStructured.hasOwnProperty(city)) {
        jobsStructured[city] = {};
        jobsStructured[city][department] = [] as JobData[];

        jobsStructured[city][department].push({ title, url });
      } else if (!jobsStructured[city].hasOwnProperty(department)) {
        jobsStructured[city][department] = [] as JobData[];

        jobsStructured[city][department].push({ title, url });
      } else {
        jobsStructured[city][department].push({ title, url });
      }
    });

    console.log(JSON.stringify(jobsStructured, null, 4));

    return jobsStructured;
  }
}
