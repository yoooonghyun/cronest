import { IsDate, IsNumber, IsString } from 'class-validator';
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
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  public readonly createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamptz' })
  public readonly updatedAt: Date;

  @IsDate()
  @DeleteDateColumn({ type: 'timestamptz' })
  public readonly deletedAt: Date;

  @IsString()
  @Column()
  public readonly name: string;

  @IsString()
  @Column({ unique: true })
  public readonly accountId: string;

  @IsString()
  @Column()
  public readonly password: string;

  @IsString()
  @Column()
  public readonly salt: string;
}
