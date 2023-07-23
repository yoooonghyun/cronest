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
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { ScheduleJobEvent } from 'src/model/schedule.job.event';
import { ChannelEnum } from 'src/enum/channel.enum';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Field, Int, ObjectType } from '@nestjs/graphql';

type ScheduleJobCol = keyof ScheduleJob;

export const ScheduleJobUniqueCols: ScheduleJobCol[] = ['key', 'domain', 'callbackCannel'];

@ObjectType()
@Unique(ScheduleJobUniqueCols)
@Entity('schedule_job')
export class ScheduleJob {
  @IsNumber()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: Date;

  @IsDate()
  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  public readonly updatedAt: Date;

  @IsDate()
  @Field(() => Date)
  @DeleteDateColumn({ type: 'timestamptz' })
  public readonly deletedAt: Date;

  @IsString()
  @Field(() => String)
  @Column()
  public readonly cronSchedule: string;

  @IsString()
  @Field(() => String)
  @Column()
  public readonly key: string;

  @IsString()
  @Field(() => String)
  @Column()
  public readonly domain: string;

  @IsEnum(JobRunningStateEnum)
  @Field(() => JobRunningStateEnum)
  @Column()
  public readonly runningState: JobRunningStateEnum;

  @IsEnum(ChannelEnum)
  @Field(() => ChannelEnum)
  @Column()
  public readonly callbackCannel: ChannelEnum;

  @IsString()
  @Field(() => String)
  @Column()
  public readonly callbackPath: string;

  @OneToMany(() => ScheduleJobEvent, (ev) => ev.job, {
    cascade: true,
  })
  readonly events: ScheduleJobEvent[];
}
