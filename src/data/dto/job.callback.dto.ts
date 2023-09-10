import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { JobCallback } from 'src/model/job.callback';

/**
 * @class
 * @description
 * @extends JobCallback
 */
@ObjectType()
export class ReadJobCallbackDto extends OmitType(JobCallback, [] as const, ObjectType) {}

@InputType()
export class CreateJobCallbackDto extends OmitType(
  JobCallback,
  ['id', 'createdAt'] as const,
  InputType,
) {}
