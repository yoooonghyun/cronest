import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseDto } from 'src/data/dto/response.dto';
import { ScheduleJobResponse } from 'src/data/dto/schedule.job.output';
import {
  CreateScheduleJobInput,
  UpdateScheduleJobRunningStateInput,
} from 'src/data/dto/schedule.job.input';
import { CmdScheduleJobService } from 'src/service/schedule.job/cmd.schedule.job.service';

@Controller()
export class RabbitMqConsumer {
  constructor(private readonly cmdJobSvc: CmdScheduleJobService) {}

  @MessagePattern('createScheduleJob')
  async createScheduleJob(
    @Payload() payload: CreateScheduleJobInput,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.cmdJobSvc.create(payload);

    return ResponseDto.createSuccess(ret);
  }

  @MessagePattern('updateScheduleJobRunningState')
  async updateScheduleJobRunningState(
    @Payload('id') id: number,
    @Payload() payload: UpdateScheduleJobRunningStateInput,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.cmdJobSvc.updateRunningState(id, payload);

    return ResponseDto.createSuccess(ret);
  }
}
