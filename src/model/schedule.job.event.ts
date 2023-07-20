import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsDate, IsEnum } from 'class-validator';
import { EventHandleTypeEnum, EventStateEnum } from 'src/enum/event.enum';
import { JobRunningStateEnum } from 'src/enum/job.enum';
import { ScheduleJob } from 'src/model/schedule.job';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('schedule_job_event')
export class ScheduleJobEvent {
  @IsNumber()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: Date;

  @IsEnum(EventHandleTypeEnum)
  @Field(() => EventHandleTypeEnum)
  @Column()
  public readonly handleType: EventHandleTypeEnum;

  @IsNumber()
  @Field(() => Int)
  @Column()
  public readonly jobId: number;

  @IsEnum(JobRunningStateEnum)
  @Field(() => JobRunningStateEnum)
  @Column()
  public readonly runningState: JobRunningStateEnum;

  @IsEnum(EventStateEnum)
  @Field(() => EventStateEnum)
  @Column({ default: EventStateEnum.CREATED })
  public readonly eventState: EventStateEnum;

  @JoinColumn({ name: 'jobId' })
  @ManyToOne(() => ScheduleJob, (job) => job.events, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  public readonly job: Promise<ScheduleJob>;
}
