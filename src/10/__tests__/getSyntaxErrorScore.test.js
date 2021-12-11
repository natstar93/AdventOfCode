import getSyntaxErrorScore, { getFirstCorruptedChar } from '../getSyntaxErrorScore';
import testData from '../testData';

test('getFirstCorruptedChar returns correct result', () => {
  expect(getFirstCorruptedChar('()')).toEqual(undefined);
  expect(getFirstCorruptedChar('([])')).toEqual(undefined);
  expect(getFirstCorruptedChar('(]')).toEqual(']');
  expect(getFirstCorruptedChar('(])')).toEqual(']');
  expect(getFirstCorruptedChar('{([(<{}[<>[]}>{[]{[(<()>')).toEqual('}');
  expect(getFirstCorruptedChar('[({(<(())[]>[[{[]{<()<>>')).toEqual(undefined);
});

test('getSyntaxErrorScore calculates score for corrupted lines', () => {
  expect(getSyntaxErrorScore(testData)).toEqual(26397);
});
