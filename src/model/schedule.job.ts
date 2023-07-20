import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from 'protobufjs';
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { GrpcDecorator } from 'src/third.party/grpc/grpc.decorator';
import { ChannelEnum } from 'src/enum/channel.enum';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Field, Int, ObjectType } from '@nestjs/graphql';

type ScheduleJobCol = keyof ScheduleJob;

export const ScheduleJobUniqueCols: ScheduleJobCol[] = ['key', 'domain', 'callbackCannel'];

@ObjectType()
@Unique(ScheduleJobUniqueCols)
@Entity('schedule_job')
export class ScheduleJob extends Message {
  @IsNumber()
  @Field(() => Int)
  @GrpcDecorator.field('int32')
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @Field(() => Date)
  @GrpcDecorator.field('string')
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: Date;

  @IsDate()
  @Field(() => Date)
  @GrpcDecorator.field('string')
  @UpdateDateColumn({ type: 'timestamptz' })
  public readonly updatedAt: Date;

  @IsDate()
  @Field(() => Date)
  @GrpcDecorator.field('string')
  @DeleteDateColumn({ type: 'timestamptz' })
  public readonly deletedAt: Date;

  @IsString()
  @Field(() => String)
  @GrpcDecorator.field('string')
  @Column()
  public readonly cronSchedule: string;

  @IsString()
  @Field(() => String)
  @GrpcDecorator.field('string')
  @Column()
  public readonly key: string;

  @IsString()
  @Field(() => String)
  @GrpcDecorator.field('string')
  @Column()
  public readonly domain: string;

  @IsEnum(JobRunningStateEnum)
  @Field(() => JobRunningStateEnum)
  @GrpcDecorator.field(JobRunningStateEnum)
  @Column()
  public readonly runningState: JobRunningStateEnum;

  @IsEnum(ChannelEnum)
  @Field(() => ChannelEnum)
  @GrpcDecorator.field('string')
  @Column()
  public readonly callbackCannel: ChannelEnum;

  @IsString()
  @Field(() => String)
  @GrpcDecorator.field('string')
  @Column()
  public readonly callbackPath: string;

  @OneToMany(() => ScheduleJobEvent, (ev) => ev.job, {
    cascade: true,
  })
  readonly events: ScheduleJobEvent[];
}
