import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCallback } from 'src/model/job.callback';
import { ScheduleJob } from 'src/model/schedule.job';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';

export * from 'src/model/job.callback';
export * from 'src/model/schedule.job';
export * from 'src/model/schedule.job.event';

export const Models = [ScheduleJob, ScheduleJobEvent, JobCallback];

@Module({
  imports: [TypeOrmModule.forFeature(Models)],
  exports: [TypeOrmModule],
})
export class ModelModule {}
