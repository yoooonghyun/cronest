import { Module } from '@nestjs/common';
import { RabbitMqConsumer } from 'src/consumer/rabbit.mq/rabbit.mq.consumer';
import { ServiceModule } from 'src/service/service.module';

export * from 'src/consumer/rabbit.mq/rabbit.mq.consumer';

@Module({
  imports: [ServiceModule],
  controllers: [RabbitMqConsumer],
})
export class RabbitMqConsumerModule {}
