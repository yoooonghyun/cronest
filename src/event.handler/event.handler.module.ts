import { Module } from '@nestjs/common';
import { ScheduleJobEventHandlerModule } from './schedule.job/schedule.job.event.handler.module';

export * from 'src/event.handler/schedule.job/schedule.job.event.handler';

@Module({
  imports: [ScheduleJobEventHandlerModule],
  controllers: [],
})
export class EventHandlerModule {}
