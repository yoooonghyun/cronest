import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import * as R from 'ramda';
import { ResultEnum } from 'src/enum/result.enum';

const dafaultMsgMap: { [key in ResultEnum] } = {
  [ResultEnum.SUCCESS]: 'Success.',
  [ResultEnum.UNKNOWN_ERROR]: 'Failed to request.',
};

export function ResponseType<T>(payloadType: Type<T> | Type<T>[]): any {
  @ObjectType({ isAbstract: true })
  class ResponseClass {
    @Field(() => ResultEnum)
    public readonly result: ResultEnum;

    @Field(() => String)
    public readonly message: string;

    @Field(() => payloadType)
    public readonly payload: T;

    public static createSuccess(payload: T): ResponseClass {
      return ResponseClass.create(payload, ResultEnum.SUCCESS, null);
    }

    public static create(
      payload: T,
      result: ResultEnum | null,
      message: string | null,
    ): ResponseClass {
      const ret = result || ResultEnum.SUCCESS;
      const msg = message || R.prop(ret, dafaultMsgMap);

      const res = new ResponseClass();

      return Object.assign(res, {
        payload,
        result: ret,
        message: msg,
      });
    }
  }

  return ResponseClass;
}

export class ResponseDto extends ResponseType(Object) {}
