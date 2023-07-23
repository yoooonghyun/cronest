import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ScheduleJob } from 'src/model/schedule.job';
import * as R from 'ramda';
import { ChannelEnum } from 'src/enum/channel.enum';
import { RabbitMqPublisherDelegate } from 'src/publisher/rabbit.mq/rabbit.mq.publisher.delegate';
import { RestPublisherDelegate } from 'src/publisher/rest/rest.publisher.delegate';
import { GrpcPublisherDelegate } from './grpc/grpc.publisher.delegate';

@Injectable()
export class Publisher {
  private readonly logger: Logger;

  constructor(
    private readonly rest: RestPublisherDelegate,
    private readonly rabbitMq: RabbitMqPublisherDelegate,
    private readonly grpc: GrpcPublisherDelegate,
  ) {
    this.logger = new Logger(Publisher.name);
  }

  public async sendCallback(job: ScheduleJob): Promise<void> {
    this.logger.log(`Publish callback: ${job.domain}, key: ${job.key}.`);
    const deletegate = this.getDelegate(job.callbackCannel);

    await deletegate.sendScheduleSafety(job);
  }

  public getDelegate(channel: ChannelEnum) {
    return R.memoizeWith(
      (c) => c,
      (c: ChannelEnum) => {
        switch (c) {
          case ChannelEnum.RABBIT_MQ:
            return this.rabbitMq;
          case ChannelEnum.REST:
            return this.rest;
          case ChannelEnum.GRPC:
            return this.grpc;
          default:
            throw new HttpException('Failed to find publisher.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      },
    )(channel);
  }
}
