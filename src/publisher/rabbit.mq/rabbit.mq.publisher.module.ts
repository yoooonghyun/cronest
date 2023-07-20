import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqQueueEnum } from 'src/third.party/rabbit.mq/rabbit.mq.enum';
import { RabbitMqPublisherDelegate } from 'src/publisher/rabbit.mq/rabbit.mq.publisher.delegate';

export * from 'src/publisher/rabbit.mq/rabbit.mq.publisher.delegate';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBIT_MQ_CLIENT',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://user:password@localhost:5672`],
            queue: RabbitMqQueueEnum.CALLBACK,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [RabbitMqPublisherDelegate],
  exports: [RabbitMqPublisherDelegate],
})
export class RabbitMqPublisherModule {}
