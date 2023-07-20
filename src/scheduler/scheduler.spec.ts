import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ScheduleJob } from 'src/model/schedule.job';
import { plainToInstance } from 'class-transformer';
import { JobRunningStateEnum } from 'src/enum/enum';
import { CronJob } from 'cron';
import { SchedulerModule } from './scheduler.module';
import { Scheduler } from './scheduler';

describe('Scheduler', () => {
  jest.setTimeout(30000);
  let app: TestingModule;
  let scheduler: Scheduler;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [SchedulerModule],
    }).compile();

    scheduler = app.get(Scheduler);
  });

  afterEach(async () => {
    scheduler.clear();
  });

  const createJob = (): ScheduleJob => {
    return plainToInstance(ScheduleJob, {
      id: faker.number.int(),
      createdAt: new Date(),
      cronSchedule: '* * * * * *',
      key: faker.word.noun,
      domain: faker.word.noun,
      state: JobRunningStateEnum.ON,
      callbackCannel: '',
      callbackPath: '',
    });
  };

  it('Register & Unregister Job', async () => {
    const newJob: ScheduleJob = createJob();

    scheduler.resgisterJob(newJob);

    const readJob: CronJob = scheduler.getJob(newJob.id);

    expect(readJob).not.toBeNull();

    scheduler.unresgisterJob(newJob.id);

    const readJob2: CronJob = scheduler.getJob(newJob.id);

    expect(readJob2).toBeNull();
  });
});
