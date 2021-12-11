import getTotalFlashes, { getGrid, getGridAfterOneStep, getSimultaneouslyFlashingStep } from '../getTotalFlashes';
import testData, { data5x5, testDataGrid, testDataGridAfterOneStep, testDataGridAfterTwoSteps, x } from '../testData';

const initialGrid = [
  [1, 1, 1, 1, 1],
  [1, 9, 9, 9, 1],
  [1, 9, 1, 9, 1],
  [1, 9, 9, 9, 1],
  [1, 1, 1, 1, 1],
];

const gridAfterOneStep = [
  [3, 4, 5, 4, 3],
  [4, 0, 0, 0, 4],
  [5, 0, 0, 0, 5],
  [4, 0, 0, 0, 4],
  [3, 4, 5, 4, 3],
];

const gridAfterTwoSteps = [
  [4, 5, 6, 5, 4],
  [5, 1, 1, 1, 5],
  [6, 1, 1, 1, 6],
  [5, 1, 1, 1, 5],
  [4, 5, 6, 5, 4],
];

test('getGrid returns correct grid', () => {
  // expect(getGrid(data5x5)).toEqual(initialGrid);
  // expect(getGrid(testData)).toEqual(testDataGrid);
});

test('getGridAfterOneStep returns correct grid', () => {
  expect(getGridAfterOneStep([[0]])).toEqual({ flashes: 0, grid: [[1]] });
  expect(getGridAfterOneStep(initialGrid)).toEqual({ flashes: 9, grid: gridAfterOneStep });
  expect(getGridAfterOneStep(gridAfterOneStep)).toEqual({ flashes: 0, grid: gridAfterTwoSteps });
  expect(getGridAfterOneStep(testDataGrid)).toEqual({ flashes: 0, grid: testDataGridAfterOneStep });
  expect(getGridAfterOneStep([
    [6, 5, 9], // [ 7, 6, 10 ], [ 7, 7, 10 ],
    [3, 8, 5], // [ 4, 9, 6 ],  [ 4, 10, 7 ],
    [6, 3, 7], // [ 7, 4, 8 ]   [ 7, 4, 8 ]
  ])).toEqual({ flashes: 2, grid: [
    [8, 8, 0],
    [5, 0, 8],
    [8, 5, 9],
  ] });
  expect(getGridAfterOneStep(testDataGridAfterOneStep)).toEqual({ flashes: 35, grid: testDataGridAfterTwoSteps });
});

test('getTotalFlashes gets total flashes after n steps', () => {
  expect(getTotalFlashes(1, testData)).toEqual(0);
  expect(getTotalFlashes(2, testData)).toEqual(35);
  expect(getTotalFlashes(10, testData)).toEqual(204);
  expect(getTotalFlashes(100, testData)).toEqual(1656);
});

test.only('getSimultaneouslyFlashingStep gets step no of first simultaneous flash', () => {
  expect(getSimultaneouslyFlashingStep(testData)).toEqual(195);
});
