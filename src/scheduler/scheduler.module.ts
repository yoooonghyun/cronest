import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PublisherModule } from 'src/publisher/publisher.module';
import { Scheduler } from 'src/scheduler/scheduler';

export * from 'src/scheduler/scheduler';

@Module({
  imports: [CqrsModule, PublisherModule],
  providers: [Scheduler],
  exports: [Scheduler],
})
export class SchedulerModule {}
