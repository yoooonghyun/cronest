import { Module } from '@nestjs/common';
import { ScheduleJobServiceModule } from './schedule.job/schedule.job.service.module';

@Module({
  imports: [ScheduleJobServiceModule],
  exports: [ScheduleJobServiceModule],
})
export class ServiceModule {}
