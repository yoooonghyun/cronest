import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { ScheduleJobEventSubscriber } from './schedule.job.event.subscriber';
import { ScheduleJobEventHandler } from './schedule.job.event.handler';

@Module({
  imports: [CqrsModule, SchedulerModule],
  providers: [ScheduleJobEventHandler, ScheduleJobEventSubscriber],
})
export class ScheduleJobEventHandlerModule {}
