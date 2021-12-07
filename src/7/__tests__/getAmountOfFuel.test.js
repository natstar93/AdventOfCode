import getAmountOfFuel, {
  getFactorial,
  getFuelToMoveAllToPosition,
} from '../getAmountOfFuel';

const testInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test('getFactorial gets factorial of number', () => {
  expect(getFactorial(3)).toEqual(6);
  expect(getFactorial(16 - 5)).toEqual(66);
  expect(getFactorial(1)).toEqual(1);
  expect(getFactorial(0)).toEqual(0);
});

test('getFuelToMoveAllToPosition calculates distances from desiredPosition', () => {
  expect(getFuelToMoveAllToPosition(2, testInput)).toEqual(37);
  expect(getFuelToMoveAllToPosition(1, testInput)).toEqual(41);
  expect(getFuelToMoveAllToPosition(10, testInput)).toEqual(71);
});

test('getFuelToMoveAllToPosition calculates distances from desiredPosition when isFuelUseFactorial', () => {
  expect(getFuelToMoveAllToPosition(2, testInput, true)).toEqual(206);
  expect(getFuelToMoveAllToPosition(5, testInput, true)).toEqual(168);
});

test('getAmountOfFuel gets least amount of fuel to align', () => {
  expect(getAmountOfFuel(testInput)).toEqual(37);
  expect(getAmountOfFuel(testInput, true)).toEqual(168);
  expect(getAmountOfFuel([32741], true)).toEqual(0);
});
