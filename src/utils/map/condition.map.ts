import { Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as R from 'ramda';

export class ConditionMap<ConditionObj extends object, ValueObject extends object> {
  private readonly map: Map<ConditionObj, ValueObject>;

  private readonly conditionType: Type<ConditionObj>;

  constructor(conditionType: Type<ConditionObj>) {
    this.conditionType = conditionType;
    this.map = new Map();
  }

  public pushValue(condition: ConditionObj, value: ValueObject): void {
    if (this.getValue(condition)) throw new Error('Duplicated condtions.');

    this.map.set(condition, value);
  }

  public getValue<T extends ConditionObj>(condition: T): ValueObject {
    return R.memoizeWith(
      R.bind(this.createMemoizeKey, this),
      R.bind(this.findFromMap, this),
    )(condition);
  }

  private findFromMap<T extends ConditionObj>(condition: T) {
    const keys: ConditionObj[] = [...this.map.keys()];

    const key: ConditionObj = keys.find((k) => R.whereEq(k, condition));

    if (R.isNil(key)) return null;

    return this.map.get(key);
  }

  private createMemoizeKey<T extends ConditionObj>(condition: T) {
    return R.pipe(this.excludeExtraneousValues, JSON.stringify)(condition);
  }

  private excludeExtraneousValues<T extends ConditionObj>(condition: T): ConditionObj {
    return plainToInstance(this.conditionType, condition, { excludeExtraneousValues: true });
  }
}
