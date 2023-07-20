import { faker } from '@faker-js/faker';
import * as R from 'ramda';
import { ConditionMap } from './condition.map';

describe('ConditionMap', () => {
  jest.setTimeout(30000);
  class A {
    constructor(str: string, num: number) {
      this.str = str;
      this.num = num;
    }

    static createRandomly() {
      return new A(faker.word.noun(), faker.number.int());
    }

    str: string;

    num: number;
  }

  it('Get empty value', async () => {
    const map = new ConditionMap<A, A>(A);

    const condition = A.createRandomly();

    const readValue: A = map.getValue(condition);

    expect(readValue).toBeNull();
  });

  it('Register & Unregister Value', async () => {
    const map = new ConditionMap<A, A>(A);

    const value = A.createRandomly();
    const condition = A.createRandomly();

    map.pushValue(condition, value);

    const inputCondition = R.assoc('additional', faker.date.anytime, condition);

    const readValue: A = map.getValue(inputCondition);

    expect(readValue).toBe(value);
  });

  it('Duplicated Value', async () => {
    const map = new ConditionMap<A, A>(A);

    const value = A.createRandomly();
    const condition = A.createRandomly();

    map.pushValue(condition, value);

    expect(() => map.pushValue(condition, value)).toThrowError();
  });
});
