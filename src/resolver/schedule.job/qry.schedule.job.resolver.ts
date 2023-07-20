import { Resolver, Args, Query, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PaginationArgs } from 'src/data/args/pagination.args';
import { ResponseDto } from 'src/data/dto/response.dto';
import { ScheduleJobEventOutput } from 'src/data/dto/schedule.job.event.output';
import {
  ScheduleJobOutput,
  ScheduleJobArrayResponse,
  ScheduleJobResponse,
} from 'src/data/dto/schedule.job.output';
import { QryScheduleJobService } from 'src/service/schedule.job/qry.schedule.job.service';

@Resolver(ScheduleJobOutput)
export class QryScheduleJobResolver {
  constructor(private readonly qrySvc: QryScheduleJobService) {}

  @Query(() => ScheduleJobResponse)
  async scheduleJob(
    @Args('id', { type: () => Int, nullable: true }) id: number,
  ): Promise<ScheduleJobResponse> {
    const ret = await this.qrySvc.readOne(id);

    return ResponseDto.createSuccess(ret);
  }

  @Query(() => ScheduleJobArrayResponse)
  async scheduleJobs(
    @Args('pagination', { type: () => PaginationArgs }) paginationArgs: PaginationArgs,
  ): Promise<ScheduleJobArrayResponse> {
    const ret = await this.qrySvc.readMany(paginationArgs);

    return ResponseDto.createSuccess(ret);
  }

  @ResolveField(() => [ScheduleJobEventOutput])
  async events(@Parent() job: ScheduleJobOutput): Promise<ScheduleJobEventOutput[]> {
    return this.qrySvc.readEventManyByJobId(job.id);
  }
}
