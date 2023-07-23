import { Module } from '@nestjs/common';
import { GrpcPublisherDelegate } from 'src/publisher/grpc/grpc.publisher.delegate';

export * from 'src/publisher/grpc/grpc.publisher.delegate';

@Module({
  providers: [GrpcPublisherDelegate],
  exports: [GrpcPublisherDelegate],
})
export class GrpcPublisherModule {}
