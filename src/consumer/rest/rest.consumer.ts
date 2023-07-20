import { Controller, Delete, Param, Patch, Post, Get, Query, Body } from '@nestjs/common';
import { PaginationArgs } from 'src/data/args/pagination.args';
import { ResponseDto } from 'src/data/dto/response.dto';
import { ScheduleJobArrayResponse, ScheduleJobResponse } from 'src/data/dto/schedule.job.output';
import {
  CreateScheduleJobInput,
  UpdateScheduleJobRunningStateInput,
} from 'src/data/dto/schedule.job.input';
import { CmdScheduleJobService } from 'src/service/schedule.job/cmd.schedule.job.service';
import { QryScheduleJobService } from 'src/service/schedule.job/qry.schedule.job.service';

@Controller()
export class RestConsumer {
  constructor(
    private readonly cmdJobSvc: CmdScheduleJobService,
    private readonly qryJobSvc: QryScheduleJobService,
  ) {}

  @Post('scheduleJob')
  async createScheduleJobs(@Body() body: CreateScheduleJobInput): Promise<ScheduleJobResponse> {
    const ret = await this.cmdJobSvc.create(body);

    return ResponseDto.createSuccess(ret);
  }

  @Get('scheduleJobs')
  async queryScheuleJobs(@Query() pagination: PaginationArgs): Promise<ScheduleJobArrayResponse> {
    const ret = await this.qryJobSvc.readMany(pagination);

    return ResponseDto.createSuccess(ret);
  }

  @Patch('scheduleJobs/:jobId/runningState')
  async updateScheduleJobState(
    @Param('jobId') jobId: number,
    @Body() body: UpdateScheduleJobRunningStateInput,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.cmdJobSvc.updateRunningState(jobId, body);

    return ResponseDto.createSuccess(ret);
  }

  @Delete('scheduleJobs/:jobId')
  async deleteScheduleJob(@Param('jobId') jobId: number): Promise<ScheduleJobResponse> {
    const ret = await this.cmdJobSvc.delete(jobId);

    return ResponseDto.createSuccess(ret);
  }
}
