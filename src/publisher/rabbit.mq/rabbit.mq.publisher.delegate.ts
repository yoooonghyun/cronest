import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ScheduleJob } from 'src/model/schedule.job';
import { PublisherDelegate } from 'src/publisher/publisher.delegate';

@Injectable()
export class RabbitMqPublisherDelegate implements PublisherDelegate {
  private readonly logger: Logger;

  constructor(@Inject('RABBIT_MQ_CLIENT') private readonly client: ClientProxy) {
    this.logger = new Logger(RabbitMqPublisherDelegate.name);
  }

  public async sendCallback(job: ScheduleJob): Promise<void> {
    this.logger.log(`Publish callback: ${job.domain}, key: ${job.key}.`);
    this.client.send('jobCallback', job);
  }

  public async sendScheduleSafety(job: ScheduleJob): Promise<void> {
    try {
      await this.sendCallback(job);
    } catch (err: any) {
      this.logger.error(err);
    }
  }
}
