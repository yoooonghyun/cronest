import { Module } from '@nestjs/common';
import { RestConsumer } from 'src/consumer/rest/rest.consumer';
import { ServiceModule } from 'src/service/service.module';

export * from 'src/consumer/rest/rest.consumer';

@Module({
  imports: [ServiceModule],
  controllers: [RestConsumer],
})
export class RestConsumerModule {}
