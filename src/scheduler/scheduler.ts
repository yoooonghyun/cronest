import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { ScheduleJob } from 'src/model/schedule.job';
import { Publisher } from 'src/publisher/publisher.module';
import { EventBus } from '@nestjs/cqrs';

type CronMap = { [key in number]: CronJob };

@Injectable()
export class Scheduler {
  private readonly jobsMap: CronMap;

  constructor(private readonly publisher: Publisher, private readonly eventBus: EventBus) {
    this.jobsMap = {};
    this.eventBus.subscribe();
  }

  public resgisterJob(job: ScheduleJob): void {
    this.unresgisterJob(job.id);

    const cron = this.createCronJob(job);

    this.startCronJob(cron);

    this.jobsMap[job.id] = cron;
  }

  public unresgisterJob(jobId: number): void {
    const job = this.getJob(jobId);

    if (!job) return;

    this.stopCronJob(job);

    delete this.jobsMap[jobId];
  }

  public clear(): void {
    const jobIds = R.keys(this.jobsMap);

    R.map(this.unresgisterJob, jobIds);
  }

  public getJob(jobId: number): CronJob {
    return R.pipe(R.prop(R.__, this.getJobsMap()), R.defaultTo(null))(jobId);
  }

  private getJobsMap(): CronMap {
    return this.jobsMap;
  }

  private startCronJob(cron: CronJob): void {
    cron.start();
  }

  private stopCronJob(cron: CronJob): void {
    cron.stop();
  }

  private createCronJob(job: ScheduleJob): CronJob {
    return new CronJob(job.cronSchedule, this.run.bind(this, job));
  }

  private async run(job: ScheduleJob): Promise<void> {
    await this.publisher.sendCallback(job);
  }
}
