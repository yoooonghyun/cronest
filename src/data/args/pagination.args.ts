import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  public readonly from: number;

  @Field(() => Int)
  public readonly size: number;
}
