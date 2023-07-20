import { IsDate, IsNumber, IsString } from 'class-validator';
import { GrpcDecorator } from 'src/third.party/grpc/grpc.decorator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @IsNumber()
  @GrpcDecorator.field('int32')
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @GrpcDecorator.field('string')
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: Date;

  @IsDate()
  @GrpcDecorator.field('string')
  @UpdateDateColumn({ type: 'timestamptz' })
  public readonly updatedAt: Date;

  @IsDate()
  @GrpcDecorator.field('string')
  @DeleteDateColumn({ type: 'timestamptz' })
  public readonly deletedAt: Date;

  @IsString()
  @GrpcDecorator.field('string')
  @Column()
  public readonly name: string;

  @IsString()
  @GrpcDecorator.field('string')
  @Column({ unique: true })
  public readonly accountId: string;

  @IsString()
  @GrpcDecorator.field('string')
  @Column()
  public readonly password: string;

  @IsString()
  @GrpcDecorator.field('string')
  @Column()
  public readonly salt: string;
}
