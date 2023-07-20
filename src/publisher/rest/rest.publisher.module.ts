import { Module } from '@nestjs/common';
import { RestPublisherDelegate } from 'src/publisher/rest/rest.publisher.delegate';

export * from 'src/publisher/rest/rest.publisher.delegate';

@Module({
  providers: [RestPublisherDelegate],
  exports: [RestPublisherDelegate],
})
export class RestPublisherModule {}
