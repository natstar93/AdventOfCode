import getAutocompleteScore, { getRequiredClosingChars } from '../getAutocompleteScore';
import testData from '../testData';

test('getRequiredClosingChars returns correct result for valid and corrupt strings', () => {
  expect(getRequiredClosingChars('()')).toEqual(null);
  expect(getRequiredClosingChars('([])')).toEqual(null);
  expect(getRequiredClosingChars('(]')).toEqual(null);
});

test('getRequiredClosingChars returns correct result for incomplete strings', () => {
  expect(getRequiredClosingChars('((')).toEqual([')', ')']);
  expect(getRequiredClosingChars('([<<>')).toEqual(['>', "]", ")"]);
  expect(getRequiredClosingChars('<{([{{}}[<[[[<>{}]]]>[]]')).toEqual([']', ')', '}', '>']);
  expect(getRequiredClosingChars('[({(<(())[]>[[{[]{<()<>>')).toEqual('}}]])})]'.split(''));
});

test('getAutocompleteScore calculates middle score for autocompleted lines', () => {
  expect(getAutocompleteScore(testData)).toEqual(288957);
});
