import { Module } from '@nestjs/common';
import { RestPublisherModule } from 'src/publisher/rest/rest.publisher.module';
import { RabbitMqPublisherModule } from 'src/publisher/rabbit.mq/rabbit.mq.publisher.module';
import { Publisher } from 'src/publisher/publisher';

export * from 'src/publisher/publisher';

@Module({
  imports: [RestPublisherModule, RabbitMqPublisherModule],
  providers: [Publisher],
  exports: [Publisher],
})
export class PublisherModule {}
