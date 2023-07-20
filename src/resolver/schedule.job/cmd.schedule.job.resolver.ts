import { Resolver, Args, Mutation, Int } from '@nestjs/graphql';
import { ResponseDto } from 'src/data/dto/response.dto';
import { ScheduleJobResponse } from 'src/data/dto/schedule.job.output';
import { UpdateScheduleJobRunningStateInput } from 'src/data/dto/schedule.job.input';
import { CmdScheduleJobService } from 'src/service/schedule.job/cmd.schedule.job.service';

@Resolver()
export class CmdScheduleJobResolver {
  constructor(private readonly cmdSvc: CmdScheduleJobService) {}

  @Mutation(() => ScheduleJobResponse)
  async updateScheduleJobRunningState(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDto', { type: () => UpdateScheduleJobRunningStateInput })
    dto: UpdateScheduleJobRunningStateInput,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.cmdSvc.updateRunningState(id, dto);

    return ResponseDto.createSuccess(ret);
  }

  @Mutation(() => ScheduleJobResponse)
  async deleteScheduleJob(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.cmdSvc.delete(id);

    return ResponseDto.createSuccess(ret);
  }
}
