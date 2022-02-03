import { foo } from '../utils';

describe('Test foo function', () => {
  test('Sum of numbers 3 + 8 should be equal to 11', () => {
    expect(foo(3, 8)).toBe(11);
  });
});
