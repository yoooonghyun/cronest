import * as R from 'ramda';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PickType } from '@nestjs/swagger';
import { EventHandleTypeEnum } from 'src/enum/event.enum';
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { Scheduler } from 'src/scheduler/scheduler';
import { ConditionMap } from 'src/utils/map/condition.map';
import { Logger } from '@nestjs/common';

type HandleFunction = (event: ScheduleJobEvent) => Promise<void>;

class EventCondition extends PickType(ScheduleJobEvent, ['handleType', 'runningState'] as const) {}

@EventsHandler(ScheduleJobEvent)
export class ScheduleJobEventHandler implements IEventHandler<ScheduleJobEvent> {
  private readonly condtionMap: ConditionMap<EventCondition, HandleFunction>;

  private readonly logger: Logger;

  constructor(private readonly scheduler: Scheduler) {
    this.logger = new Logger(ScheduleJobEventHandler.name);
    this.condtionMap = new ConditionMap<EventCondition, HandleFunction>(EventCondition);

    this.condtionMap.pushValue(
      {
        handleType: EventHandleTypeEnum.CREATED,
        runningState: JobRunningStateEnum.ON,
      },
      R.bind(this.handleJobStateChangedToOn, this),
    );

    this.condtionMap.pushValue(
      {
        handleType: EventHandleTypeEnum.STATE_CHANGED,
        runningState: JobRunningStateEnum.ON,
      },
      R.bind(this.handleJobStateChangedToOn, this),
    );

    this.condtionMap.pushValue(
      {
        handleType: EventHandleTypeEnum.STATE_CHANGED,
        runningState: JobRunningStateEnum.OFF,
      },
      R.bind(this.handleJobStateChangedToOff, this),
    );

    this.condtionMap.pushValue(
      {
        handleType: EventHandleTypeEnum.DELETED,
        runningState: null,
      },
      R.bind(this.handleJobStateChangedToOff, this),
    );
  }

  public async handle(event: ScheduleJobEvent): Promise<void> {
    this.logger.log(`Handle event: jobId: ${event.jobId}, handlingType: ${event.handleType}.`);
    const handler = this.condtionMap.getValue(event);

    if (handler) R.call(handler, event);
  }

  public async handleJobStateChangedToOn(event: ScheduleJobEvent): Promise<void> {
    this.scheduler.resgisterJob(await event.job);
  }

  public async handleJobStateChangedToOff(event: ScheduleJobEvent): Promise<void> {
    this.scheduler.unresgisterJob(event.jobId);
  }
}
