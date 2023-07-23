import { Module } from '@nestjs/common';
import { RabbitMqPublisherDelegate } from 'src/publisher/rabbit.mq/rabbit.mq.publisher.delegate';

export * from 'src/publisher/rabbit.mq/rabbit.mq.publisher.delegate';

@Module({
  providers: [RabbitMqPublisherDelegate],
  exports: [RabbitMqPublisherDelegate],
})
export class RabbitMqPublisherModule {}
