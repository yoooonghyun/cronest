import { Injectable } from '@nestjs/common';
import {
  CreateScheduleJobInput,
  UpdateScheduleJobRunningStateInput,
} from 'src/data/dto/schedule.job.input';
import { ScheduleJobOutput } from 'src/data/dto/schedule.job.output';
import { ScheduleJob, ScheduleJobUniqueCols } from 'src/model/schedule.job';
import {
  DeleteResult,
  EntityManager,
  InsertResult,
  Repository,
  Transaction,
  TransactionManager,
  UpdateResult,
} from 'typeorm';
import * as R from 'ramda';
import { EventHandleTypeEnum } from 'src/enum/event.enum';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { ThirdpartyExceptionHandler } from 'src/utils/exception/handler/thirdparty.exception.handler';

@Injectable()
export class CmdScheduleJobService {
  @Transaction()
  public async create(
    dto: CreateScheduleJobInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<ScheduleJobOutput> {
    const repo: Repository<ScheduleJob> = manager.getRepository(ScheduleJob);

    const insertRet = await repo
      .createQueryBuilder()
      .insert()
      .values(dto)
      .orUpdate(R.keys(dto), ScheduleJobUniqueCols)
      .returning('*')
      .execute()
      .catch(ThirdpartyExceptionHandler.handle);

    const createdJob = repo.create(this.getDtoFromQueryResult(insertRet));

    await this.insertHistory(manager, EventHandleTypeEnum.CREATED, createdJob);

    return createdJob;
  }

  @Transaction()
  public async updateRunningState(
    id: number,
    dto: UpdateScheduleJobRunningStateInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<ScheduleJobOutput> {
    const repo: Repository<ScheduleJob> = manager.getRepository(ScheduleJob);

    const udpateRet = await repo
      .createQueryBuilder()
      .update()
      .set(dto)
      .where({ id })
      .returning('*')
      .execute()
      .catch(ThirdpartyExceptionHandler.handle);

    const updatedJob = repo.create(this.getDtoFromQueryResult(udpateRet));

    await this.insertHistory(manager, EventHandleTypeEnum.STATE_CHANGED, updatedJob);

    return updatedJob;
  }

  @Transaction()
  public async delete(
    id: number,
    @TransactionManager() manager?: EntityManager,
  ): Promise<ScheduleJobOutput> {
    const repo: Repository<ScheduleJob> = manager.getRepository(ScheduleJob);

    const deleteRet = await repo
      .createQueryBuilder()
      .softDelete()
      .where({ id })
      .returning('*')
      .execute()
      .catch(ThirdpartyExceptionHandler.handle);

    const deletedJob = repo.create(this.getDtoFromQueryResult(deleteRet));

    await this.insertHistory(manager, EventHandleTypeEnum.DELETED, deletedJob);

    return deletedJob;
  }

  private getDtoFromQueryResult(queryResult: UpdateResult | InsertResult | DeleteResult): object {
    const raws: object[] = queryResult.raw;

    const firstRaw: object = R.head(raws);

    if (R.isNil(firstRaw)) return null;

    return firstRaw;
  }

  private async insertHistory(
    manager: EntityManager,
    handleType: EventHandleTypeEnum,
    job: ScheduleJob,
  ): Promise<void> {
    await manager.getRepository(ScheduleJobEvent).insert({
      handleType,
      jobId: job.id,
      runningState: job.runningState,
    });
  }
}
