import getNoOfUniqueSegments, { getNumberCodes, getOutputs, getIsMatch } from '../getUniqueSegments';
import testData from '../testData';

test('getNumberCodes gets map of positions', () => {
  const input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
  expect(getNumberCodes(input)).toEqual(["cagedb", "ab", "gcdfa", "fbcad", "eafb", "cdfbe", "cdfgeb", "dab", "acedgfb", "cefabd"]);
});

test('getNoOfUniqueSegments gets number of unique segments', () => {
  expect(getNoOfUniqueSegments(testData)).toEqual(26);
});

test('getIsMatch correctly returns whether strings contain same elements', () => {
  expect(getIsMatch('abc', 'bca')).toEqual(true);
  expect(getIsMatch('abc', 'bca')).toEqual(true);
  expect(getIsMatch('gcafb', 'cfgab')).toEqual(true);
  expect(getIsMatch('gcafb', 'cfgax')).toEqual(false);
  expect(getIsMatch('a', 'ab')).toEqual(false);
});

test('getOutputs gets total of output digits', () => {
  const oneLine = `gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
  const oneLine2 = `gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae`;
  expect(getOutputs(testData)).toEqual(61229);
  expect(getOutputs(oneLine)).toEqual(4315);
  expect(getOutputs(oneLine2)).toEqual(4);
});
