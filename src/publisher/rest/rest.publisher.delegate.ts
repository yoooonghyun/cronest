import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ScheduleJob } from 'src/model/schedule.job';
import { PublisherDelegate } from 'src/publisher/publisher.delegate';

@Injectable()
export class RestPublisherDelegate implements PublisherDelegate {
  private readonly axios: AxiosInstance;

  private readonly logger: Logger;

  constructor() {
    this.axios = axios.create();
    this.logger = new Logger(RestPublisherDelegate.name);
  }

  public async sendCallback(job: ScheduleJob): Promise<void> {
    this.logger.log(`Publish callback: ${job.domain}, key: ${job.key}.`);
    const ret = await this.axios.post(job.callbackPath, job);

    if (ret.status !== HttpStatus.OK) {
      throw new Error(
        `Failed to schedule domain: ${job.domain}, key: ${job.key}, status: ${ret.status}, message: ${ret.statusText}.`,
      );
    }
  }

  public async sendScheduleSafety(job: ScheduleJob): Promise<void> {
    try {
      await this.sendCallback(job);
    } catch (err: any) {
      this.logger.error(err);
    }
  }
}
