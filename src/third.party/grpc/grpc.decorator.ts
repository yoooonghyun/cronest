import 'reflect-metadata';
import { Field, FieldDecorator } from 'protobufjs';

type FiledType =
  | number
  | number[]
  | Long
  | Long[]
  | string
  | string[]
  | boolean
  | boolean[]
  | Uint8Array
  | Uint8Array[]
  | Buffer
  | Buffer[];

type FiledTypeStr =
  | 'double'
  | 'float'
  | 'int32'
  | 'uint32'
  | 'sint32'
  | 'fixed32'
  | 'sfixed32'
  | 'int64'
  | 'uint64'
  | 'sint64'
  | 'fixed64'
  | 'sfixed64'
  | 'string'
  | 'bool'
  | 'bytes'
  | object;

type FiledRule = 'optional' | 'required' | 'repeated';

const kFieldIndex = 'FIELD_INDEX';

export class GrpcDecorator {
  public static field<T extends FiledType>(
    fieldType: FiledTypeStr,
    fieldRule?: FiledRule,
    defaultValue?: T,
  ): FieldDecorator {
    return (target: object, fieldName: string): void => {
      const prevIdx: number = Reflect.getMetadata(kFieldIndex, target);

      const idx = (prevIdx || 0) + 1;

      Reflect.defineMetadata(kFieldIndex, idx, target);

      const filedDeco = Field.d(idx, fieldType, fieldRule, defaultValue);

      filedDeco(target, fieldName);
    };
  }
}
