import getElementQuantity, { getChain } from '../getElementQuantity';
import testData from '../testData';

test('getElementQuantity gets difference after n iterations', () => {
  expect(getElementQuantity(testData, 10)).toEqual(1588);
});
