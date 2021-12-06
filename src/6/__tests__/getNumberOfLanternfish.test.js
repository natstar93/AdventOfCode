import getNumberOfLanternfish, {
  createRecord,
  getDaysUntilReproduction,
} from '../getNumberOfLanternfish';

const testInput = `3,4,3,1,2`;

test('createRecord returns an object recording fish days until reproduction', () => {
  expect(createRecord(testInput)).toEqual({
    1: 1,
    2: 1,
    3: 2,
    4: 1,
  });
});

test('getDaysUntilReproduction gets record of lanternfish after 1 day', () => {
  const initialState = {
    0: 0,
    1: 1,
    2: 1,
    3: 2,
    4: 1,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  const day1Result = {
    0: 1,
    1: 1,
    2: 2,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  const day2Result = {
    0: 1,
    1: 2,
    2: 1,
    3: 0,
    4: 0,
    5: 0,
    6: 1,
    7: 0,
    8: 1,
  };
  const day3Result = {
    0: 2,
    1: 1,
    2: 0,
    3: 0,
    4: 0,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
  };
  expect(getDaysUntilReproduction(initialState)).toEqual(day1Result);
  expect(getDaysUntilReproduction(day1Result)).toEqual(day2Result);
  expect(getDaysUntilReproduction(day2Result)).toEqual(day3Result);
});

test('getNumberOfLanternfish gets number of lanternfish after 18 days', () => {
  expect(getNumberOfLanternfish(testInput, 18)).toEqual(26);
});

test('getNumberOfLanternfish gets number of lanternfish after 80 days', () => {
  expect(getNumberOfLanternfish(testInput, 80)).toEqual(5934);
});

test('getNumberOfLanternfish gets number of lanternfish after 256 days', () => {
  expect(getNumberOfLanternfish(testInput, 256)).toEqual(26984457539);
});
