import { ObjectType, PickType } from '@nestjs/graphql';
import { ScheduleJob } from 'src/model/schedule.job';
import { ResponseType } from './response.dto';

@ObjectType()
export class ScheduleJobOutput extends PickType(
  ScheduleJob,
  [
    'callbackCannel',
    'callbackPath',
    'createdAt',
    'cronSchedule',
    'domain',
    'key',
    'runningState',
    'id',
  ] as const,
  ObjectType,
) {}

@ObjectType()
export class ScheduleJobResponse extends ResponseType(ScheduleJobOutput) {}

@ObjectType()
export class ScheduleJobArrayResponse extends ResponseType([ScheduleJobOutput]) {}
