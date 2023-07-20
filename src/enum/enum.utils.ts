import { EnumOptions, registerEnumType } from '@nestjs/graphql';

export class EnumUtils {
  public static register<T extends object = any>(enumRef: T, options?: EnumOptions<T>): void {
    registerEnumType(enumRef, options);
  }
}
