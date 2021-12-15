import getElementDiff, { getLetterOccurrences } from '../getElementDiff';
import testData from '../testData';

test('getLetterOccurrences gets totals of each letter from pairs', () => {
  expect(getLetterOccurrences({ // NNCB
    NN: 1,
    NC: 1,
    CB: 1
  }, ['N', 'B'])).toEqual({
    N: 2,
    B: 1,
    C: 1
  });

  expect(getLetterOccurrences({ // NCNBCHB
    NC: 1,
    CN: 1,
    NB: 1,
    BC: 1,
    CH: 1,
    HB: 1,
  }, ['N', 'B'])).toEqual({
    N: 2,
    B: 2,
    C: 2,
    H: 1,
  });
});
test('getElementDiff gets difference after n iterations', () => {
  expect(getElementDiff(testData, 10)).toEqual(1588);
  expect(getElementDiff(testData, 40)).toEqual(2188189693529);
});
