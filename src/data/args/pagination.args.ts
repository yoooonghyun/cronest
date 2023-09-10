import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Input arguments for requesting paginated results.
 */
@InputType()
export class PaginationArgs {
  /**
   * The starting position of the first element.
   */
  @Field(() => Int)
  public readonly from: number;

  /**
   * The maximum number of elements on a page.
   */
  @Field(() => Int)
  public readonly size: number;
}
