import { Injectable } from '@nestjs/common';
import { PaginationArgs } from 'src/data/args/pagination.args';
import { ScheduleJobEventOutput } from 'src/data/dto/schedule.job.event.output';
import { ScheduleJobOutput } from 'src/data/dto/schedule.job.output';
import { ScheduleJob } from 'src/model/schedule.job';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { ThirdpartyExceptionHandler } from 'src/utils/exception/handler/thirdparty.exception.handler';
import { getRepository } from 'typeorm';

@Injectable()
export class QryScheduleJobService {
  public async readOne(id: number): Promise<ScheduleJobOutput | null> {
    const job = await getRepository(ScheduleJob)
      .findOne(id)
      .catch(ThirdpartyExceptionHandler.handle);

    return job || null;
  }

  public async readMany(pagination: PaginationArgs): Promise<ScheduleJobOutput[]> {
    return getRepository(ScheduleJob)
      .find({
        order: { createdAt: 'DESC' },
        skip: pagination.from,
        take: pagination.size,
      })
      .catch(ThirdpartyExceptionHandler.handle);
  }

  public async readEventManyByJobId(jobId: number): Promise<ScheduleJobEventOutput[]> {
    return getRepository(ScheduleJobEvent)
      .find({
        order: { createdAt: 'DESC' },
        where: { jobId },
      })
      .catch(ThirdpartyExceptionHandler.handle);
  }
}
