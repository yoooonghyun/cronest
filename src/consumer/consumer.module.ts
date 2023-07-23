import { Module } from '@nestjs/common';
import { RestConsumerModule } from 'src/consumer/rest/rest.consumer.module';
import { RabbitMqConsumerModule } from './rabbit.mq/rabbit.mq.consumer.module';
import { GrpcConsumerModule } from './grpc/grpc.consumer.module';

export * from 'src/consumer/rest/rest.consumer.module';

@Module({
  imports: [RestConsumerModule, RabbitMqConsumerModule, GrpcConsumerModule],
})
export class ConsumerModule {}
