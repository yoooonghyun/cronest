import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ScheduleJob } from 'src/model/schedule.job';
import { plainToInstance } from 'class-transformer';
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { CronJob } from 'cron';
import {
  RestPublisherDelegate,
  RestPublisherModule,
} from 'src/publisher/rest/rest.publisher.module';

describe('RestPublisher', () => {
  jest.setTimeout(30000);
  let app: TestingModule;
  let publisher: RestPublisherDelegate;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [RestPublisherModule],
    }).compile();

    publisher = app.get(RestPublisherDelegate);
  });

  const createJob = (): ScheduleJob => {
    return plainToInstance(ScheduleJob, {
      id: faker.number.int(),
      createdAt: new Date(),
      cronSchedule: '* * * * * *',
      key: faker.word.noun,
      domain: faker.word.noun,
      runningState: JobRunningStateEnum.ON,
      callbackCannel: '',
      callbackPath: '',
    });
  };

  it('Register & Unregister Job', async () => {
    const newJob: ScheduleJob = createJob();

    publisher.resgisterJob(newJob);

    const readJob: CronJob = publisher.getJob(newJob.id);

    expect(readJob).not.toBeNull();

    publisher.unresgisterJob(newJob.id);

    const readJob2: CronJob = publisher.getJob(newJob.id);

    expect(readJob2).toBeNull();
  });
});
