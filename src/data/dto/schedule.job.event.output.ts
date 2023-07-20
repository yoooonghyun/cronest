import { ObjectType, PickType } from '@nestjs/graphql';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';

@ObjectType()
export class ScheduleJobEventOutput extends PickType(
  ScheduleJobEvent,
  ['id', 'createdAt', 'eventState', 'handleType', 'jobId', 'runningState'] as const,
  ObjectType,
) {}
