import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  CreateScheduleJobInput,
  UpdateScheduleJobRunningStateInput,
} from 'src/data/dto/schedule.job.input';
import { ChannelEnum } from 'src/enum/channel.enum';
import { faker } from '@faker-js/faker';
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { TestDatabaseUtils } from 'src/utils/test/test.database.utils';
import {
  CmdScheduleJobService,
  QryScheduleJobService,
  ScheduleJobServiceModule,
} from './schedule.job.service.module';

describe('ScheduleJobService', () => {
  jest.setTimeout(30000);
  let app: TestingModule;
  let qrySvc: QryScheduleJobService;
  let cmdSvc: CmdScheduleJobService;

  const getCreateDto = (runningState: JobRunningStateEnum): CreateScheduleJobInput => {
    return plainToInstance(CreateScheduleJobInput, {
      callbackCannel: ChannelEnum.REST,
      callbackPath: '',
      cronSchedule: '* * * * * *',
      domain: 'TEST',
      key: faker.string.uuid(),
      runningState,
    });
  };

  const getUpdateStateDto = (
    runningState: JobRunningStateEnum,
  ): UpdateScheduleJobRunningStateInput => {
    return plainToInstance(UpdateScheduleJobRunningStateInput, {
      runningState,
    });
  };

  beforeAll(async () => {
    const moduleFixture = Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), ScheduleJobServiceModule],
    });

    const memDbModuleFixture = await TestDatabaseUtils.overridePgMem(moduleFixture);

    app = await memDbModuleFixture.compile();

    qrySvc = app.get(QryScheduleJobService);
    cmdSvc = app.get(CmdScheduleJobService);
  });

  afterEach(async () => {
    await TestDatabaseUtils.clearAllSchemas(getConnection());
  });

  it('Read Empty Data.', async () => {
    const jobs = await qrySvc.readMany({
      from: 0,
      size: Number.MAX_SAFE_INTEGER,
    });

    expect(jobs).toEqual([]);
  });

  it('Create / Update / Delete Data.', async () => {
    const createDto = getCreateDto(JobRunningStateEnum.OFF);

    const createResult = await cmdSvc.create(createDto);

    expect(createResult).toEqual(expect.objectContaining(createDto));

    const jobId = createResult.id;

    const updateStateDto = getUpdateStateDto(JobRunningStateEnum.ON);

    const updateReulst = await cmdSvc.updateRunningState(jobId, updateStateDto);

    expect(updateReulst).toEqual(expect.objectContaining(updateStateDto));

    await cmdSvc.delete(jobId);

    const readResult = await qrySvc.readOne(jobId);

    expect(readResult).toBeNull();
  });
});
