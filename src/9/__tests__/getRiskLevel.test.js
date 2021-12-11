import getRiskLevel, { getGrid, getBasinSize, getThreeLargestBasinSizesMultipledTogether, getBiggest } from '../getRiskLevel';
import testData, { testDataOverlapping } from '../testData';
import data from '../data';

const lowestTopLeft = `78
88`;
const lowestBottomRight = `88
85`;
const lowestMiddle = `889
828
888`;
const gridFromTestData = { "0": [2, 1, 9, 9, 9, 4, 3, 2, 1, 0], "1": [3, 9, 8, 7, 8, 9, 4, 9, 2, 1], "2": [9, 8, 5, 6, 7, 8, 9, 8, 9, 2], "3": [8, 7, 6, 7, 8, 9, 6, 7, 8, 9], "4": [9, 8, 9, 9, 9, 6, 5, 6, 7, 8] }

test('getGrid gets grid of data', () => {
  expect(getGrid(lowestTopLeft)).toEqual({
    0: [7, 8],
    1: [8, 8]
  });

  expect(getGrid(testData)).toEqual(gridFromTestData);
});

test('getRiskLevel gets total of output digits', () => {
  expect(getRiskLevel(`3`)).toEqual(4);
  expect(getRiskLevel(lowestTopLeft)).toEqual(8);
  expect(getRiskLevel(lowestBottomRight)).toEqual(6);
  expect(getRiskLevel(lowestMiddle)).toEqual(3);
  expect(getRiskLevel(testData)).toEqual(15);
});

test('getBasinSize gets size of basin from grid and coords', () => {
  expect(getBasinSize({
    0: [7, 8],
    1: [8, 8]
  }, 0, 0)).toEqual(3);

  expect(getBasinSize({
    0: [6, 7],
    1: [7, 8]
  }, 0, 0)).toEqual(4);

  expect(getBasinSize({
    0: [7, 6, 7],
    1: [8, 7, 8],
    2: [9, 9, 9]
  }, 1, 0)).toEqual(6);

  expect(getBasinSize({
    0: [5, 4, 5, 6, 7, 8, 9],
    1: [4, 3, 4, 9, 8, 9, 1]
  }, 1, 1)).toEqual(10);

  expect(getBasinSize({
    0: [6, 7],
    1: [8, 1]
  }, 0, 0)).toEqual(3);

  expect(getBasinSize(gridFromTestData, 2, 2)).toEqual(14);
});

test('getThreeLargestBasinSizesMultipledTogether gets size of basin ', () => {
  expect(getThreeLargestBasinSizesMultipledTogether(testDataOverlapping)).toEqual(1134);
  expect(getThreeLargestBasinSizesMultipledTogether(testData)).toEqual(1134);
});

