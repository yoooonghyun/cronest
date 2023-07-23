import { Field, Int } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_callback')
export class JobCallback {
  @IsNumber()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @Field(() => Date)
  @Column()
  public readonly createdAt: Date;

  @IsDate()
  @Field(() => Date)
  @Column()
  public readonly timestamp: Date;

  @IsNumber()
  @Field(() => Int)
  @Column()
  public readonly scheduleId: number;
}
