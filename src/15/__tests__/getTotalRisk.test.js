import getTotalRisk, {
  getUnvisitedSet,
  sanitiseData,
  getInfinityMap,
  getDijkstrasPathMap,
  getLargeGrid,
} from '../getTotalRisk';

const riskArray = [
  [1, 1, 6, 3, 7, 5, 1, 7, 4, 2],
  [1, 3, 8, 1, 3, 7, 3, 6, 7, 2],
  [2, 1, 3, 6, 5, 1, 1, 3, 2, 8],
  [3, 6, 9, 4, 9, 3, 1, 5, 6, 9],
  [7, 4, 6, 3, 4, 1, 7, 1, 1, 1],
  [1, 3, 1, 9, 1, 2, 8, 1, 3, 7],
  [1, 3, 5, 9, 9, 1, 2, 4, 2, 1],
  [3, 1, 2, 5, 4, 2, 1, 6, 3, 9],
  [1, 2, 9, 3, 1, 3, 8, 5, 2, 1],
  [2, 3, 1, 1, 9, 4, 4, 5, 8, 1],
];

test('sanitiseData gets data in nice format', () => {
  expect(sanitiseData('src/15/testData.txt')).toEqual(riskArray);
});

test('getUnvisitedSet gets initial map of unvisited locations', () => {
  expect(getUnvisitedSet([
    [1, 3],
    [2, 5],
  ]))
    .toEqual({
      0: [0, 1],
      1: [0, 1],
    });
});

test('getInfinityMap gets initial map of distances', () => {
  expect(getInfinityMap([[1, 3], [2, 5]], [0, 0]))
    .toEqual([[0, Infinity], [Infinity, Infinity]]);
});

test('getDijkstrasPathMap gets map of lowest path distances', () => {
  const startCoord = [0, 0];
  expect(getDijkstrasPathMap([[1, 9], [1, 1]], startCoord))
    .toEqual([[0, 9], [1, 2]]);
  expect(getDijkstrasPathMap([[1, 1], [9, 1]], startCoord))
    .toEqual([[0, 1], [9, 2]]);
  expect(getDijkstrasPathMap([
    [1, 9, 1, 1, 1],
    [1, 1, 1, 9, 1],
    [9, 9, 9, 9, 1],
    [9, 9, 9, 9, 1],
    [9, 9, 9, 9, 1],
  ], startCoord)).toEqual([
    [0, 9, 4, 5, 6],
    [1, 2, 3, 12, 7],
    [10, 11, 12, 17, 8],
    [Infinity, Infinity, Infinity, 18, 9],
    [Infinity, Infinity, Infinity, Infinity, 10],
  ]);
  expect(getDijkstrasPathMap([
    [1, 1, 9, 9, 9],
    [9, 1, 9, 9, 9],
    [1, 1, 9, 9, 9],
    [1, 9, 9, 9, 9],
    [1, 1, 1, 1, 1],
  ], startCoord)).toEqual([
    [0, 1, 10, Infinity, Infinity],
    [9, 2, 11, Infinity, Infinity],
    [4, 3, 12, Infinity, Infinity],
    [5, 12, 17, 18, Infinity],
    [6, 7, 8, 9, 10],
  ]);
});

test('getLargeGrid gets 5 x 5 grid from original levels', () => {
  expect(getLargeGrid([[1]])).toEqual([
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
  ]);
  const largeGridTestData = sanitiseData('src/15/testDataLarge.txt');
  expect(getLargeGrid(riskArray)).toEqual(largeGridTestData);
});

test('getTotalRisk gets total of lowest risk path', () => {
  expect(getTotalRisk('src/15/testData.txt')).toEqual(40);
  expect(getTotalRisk('src/15/testData.txt', true)).toEqual(315);
});
