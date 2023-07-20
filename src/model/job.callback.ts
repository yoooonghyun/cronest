import { Message } from 'protobufjs';
import { GrpcDecorator } from 'src/third.party/grpc/grpc.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_callback')
export class JobCallback extends Message {
  @GrpcDecorator.field('int32')
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @GrpcDecorator.field('string')
  @Column()
  public readonly createdAt: Date;

  @GrpcDecorator.field('string')
  @Column()
  public readonly timestamp: Date;

  @GrpcDecorator.field('int32')
  @Column()
  public readonly scheduleId: number;
}
