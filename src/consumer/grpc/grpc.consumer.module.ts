import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { GrpcConsumer } from './grpc.consumer';

export * from 'src/consumer/rabbit.mq/rabbit.mq.consumer';

@Module({
  imports: [ServiceModule],
  controllers: [GrpcConsumer],
})
export class GrpcConsumerModule {}
