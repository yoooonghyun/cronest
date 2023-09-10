import { EnumOptions, registerEnumType } from '@nestjs/graphql';

/**
 * @class
 * @description Utility class for handling Enum types.
 */
export class EnumUtils {
  /**
   * @method @public
   * @description Register an Enum type.
   * @param enumRef Reference to the Enum type.
   * @param options Configuration options.
   */
  public static register<T extends object = any>(enumRef: T, options?: EnumOptions<T>): void {
    registerEnumType(enumRef, options);
  }
}
