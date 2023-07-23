import { ChannelEnum, JobRunningStateEnum, ResultEnum } from 'src/enum/enum';
import { plainToInstance } from 'class-transformer';
import {
  CreateScheduleJobInput,
  UpdateScheduleJobRunningStateInput,
} from '../dto/schedule.job.input';
import { ScheduleJobOutput } from '../dto/schedule.job.output';
import { ResponseType } from '../dto/response.dto';

export class CreateScheduleJobMessage {
  public toInput(): CreateScheduleJobInput {
    return plainToInstance(CreateScheduleJobInput, {
      callbackCannel: this.callbackCannel,
      callbackPath: this.callbackPath,
      cronSchedule: this.cronSchedule,
      domain: this.domain,
      key: this.key,
      runningState: this.runningState,
    });
  }

  readonly callbackCannel: ChannelEnum;

  readonly callbackPath: string;

  readonly cronSchedule: string;

  readonly domain: string;

  readonly key: string;

  readonly runningState: JobRunningStateEnum;
}

export class UpdateScheduleJobRunningStateMessage {
  public toInput(): UpdateScheduleJobRunningStateInput {
    return plainToInstance(UpdateScheduleJobRunningStateInput, {
      runningState: this.runningState,
    });
  }

  readonly id: number;

  readonly runningState: JobRunningStateEnum;
}

export class ReadScheduleJobMessage {
  public static createFromOutput(output: ScheduleJobOutput): ReadScheduleJobMessage {
    return plainToInstance(ReadScheduleJobMessage, {
      id: output.id,
      createdAt: output.createdAt,
      callbackCannel: output.callbackCannel,
      callbackPath: output.callbackPath,
      cronSchedule: output.cronSchedule,
      domain: output.domain,
      key: output.key,
      runningState: output.runningState,
    });
  }

  readonly id: number;

  readonly createdAt: Date;

  readonly callbackCannel: ChannelEnum;

  readonly callbackPath: string;

  readonly cronSchedule: string;

  readonly domain: string;

  readonly key: string;

  readonly runningState: JobRunningStateEnum;
}

export class ScheduleJobIdMessage {
  readonly id: number;
}

export class ScheduleJobResponseMessage extends ResponseType(ReadScheduleJobMessage) {
  readonly result: ResultEnum;

  readonly message: string;

  readonly payload: ReadScheduleJobMessage;
}
