import { InputType, PickType } from '@nestjs/graphql';
import { ScheduleJob } from 'src/model/schedule.job';

@InputType()
export class CreateScheduleJobInput extends PickType(
  ScheduleJob,
  ['callbackCannel', 'callbackPath', 'cronSchedule', 'domain', 'key', 'runningState'] as const,
  InputType,
) {}

@InputType()
export class UpdateScheduleJobRunningStateInput extends PickType(
  ScheduleJob,
  ['runningState'] as const,
  InputType,
) {}
