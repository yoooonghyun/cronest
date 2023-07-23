import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateScheduleJobMessage,
  ReadScheduleJobMessage,
  ScheduleJobIdMessage,
  ScheduleJobResponseMessage,
  UpdateScheduleJobRunningStateMessage,
} from 'src/data/protobuf/schdule.job.message';
import { CmdScheduleJobService } from 'src/service/schedule.job/cmd.schedule.job.service';
import { QryScheduleJobService } from 'src/service/schedule.job/qry.schedule.job.service';
import { ResponseDto } from 'src/data/dto/response.dto';

@Controller()
export class GrpcConsumer {
  constructor(
    private readonly cmdSvc: CmdScheduleJobService,
    private readonly qrySvc: QryScheduleJobService,
  ) {}

  @GrpcMethod('ScheduleJobService', 'create')
  async createScheduleJob(data: CreateScheduleJobMessage): Promise<ScheduleJobResponseMessage> {
    const ret = await this.cmdSvc.create(data);

    return ResponseDto.createSuccess(ReadScheduleJobMessage.createFromOutput(ret));
  }

  @GrpcMethod('ScheduleJobService', 'updateRunningState')
  async updateScheduleJobRunningState(
    data: UpdateScheduleJobRunningStateMessage,
  ): Promise<ScheduleJobResponseMessage> {
    const ret = await this.cmdSvc.updateRunningState(data.id, data);

    return ResponseDto.createSuccess(ReadScheduleJobMessage.createFromOutput(ret));
  }

  @GrpcMethod('ScheduleJobService', 'readOne')
  async readScheduleJob(data: ScheduleJobIdMessage): Promise<ScheduleJobResponseMessage> {
    const ret = await this.qrySvc.readOne(data.id);

    return ResponseDto.createSuccess(ReadScheduleJobMessage.createFromOutput(ret));
  }
}
