import { Connection, EventSubscriber } from 'typeorm';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { EventBus } from '@nestjs/cqrs';
import { InsertEventSubscriber } from '../insert.event.subscriber';

@EventSubscriber()
export class ScheduleJobEventSubscriber extends InsertEventSubscriber<ScheduleJobEvent> {
  constructor(readonly connection: Connection, readonly eventBus: EventBus) {
    super(connection, eventBus);
  }

  public listenTo(): typeof ScheduleJobEvent {
    return ScheduleJobEvent;
  }
}
