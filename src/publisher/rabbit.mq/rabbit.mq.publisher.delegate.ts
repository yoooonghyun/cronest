import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ScheduleJob } from 'src/model/schedule.job';
import { PublisherDelegate } from 'src/publisher/publisher.delegate';
import { RabbitMqQueueEnum } from 'src/third.party/rabbit.mq/rabbit.mq.enum';
import * as R from 'ramda';

@Injectable()
export class RabbitMqPublisherDelegate implements PublisherDelegate {
  private readonly logger: Logger;

  private readonly client: ClientProxy;

  constructor(private readonly configSvc: ConfigService) {
    this.logger = new Logger(RabbitMqPublisherDelegate.name);

    const rabbitMqUrl = this.configSvc.get('RABBIT_MQ_URL');

    if (R.isNotNil(rabbitMqUrl)) {
      this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl],
          queue: RabbitMqQueueEnum.CALLBACK,
          queueOptions: {
            durable: false,
          },
        },
      });
    }
  }

  public async sendCallback(job: ScheduleJob): Promise<void> {
    if (R.isNil(this.client)) throw new Error('RabbitMq client is not loaded.');

    this.logger.log(`Publish callback: ${job.domain}, key: ${job.key}.`);
    this.client.emit(job.callbackPath, job);
  }

  public async sendScheduleSafety(job: ScheduleJob): Promise<void> {
    try {
      await this.sendCallback(job);
    } catch (err: any) {
      this.logger.error(err);
    }
  }
}
