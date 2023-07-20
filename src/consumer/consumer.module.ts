import { Module } from '@nestjs/common';
import { RestConsumerModule } from 'src/consumer/rest/rest.consumer.module';
import { RabbitMqConsumerModule } from './rabbit.mq/rabbit.mq.consumer.module';

export * from 'src/consumer/rest/rest.consumer.module';

@Module({
  imports: [RestConsumerModule, RabbitMqConsumerModule],
})
export class ConsumerModule {}
