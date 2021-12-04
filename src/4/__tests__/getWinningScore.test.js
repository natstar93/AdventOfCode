import testData, { testDataShort } from '../testData';
import getWinningScore, {
  getLastWinningScore,
  getBoardResult,
  getWinningBoardSum,
  sanitiseDataInput,
} from '../getWinningScore';

const boardRowWin = [
  [0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
];

const boardColWin = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1],
];

const boardNoWin = [
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1],
];

test('getBoardResult correctly returns true when the row is winning', () => {
  expect(getBoardResult(boardRowWin)).toBe(true);
});

test('sanitiseDataInput correctly returns true when the row is winning', () => {
  expect(sanitiseDataInput(testDataShort)).toEqual({
    boards: [[[1, 2], [3, 4]]],
    numbersDrawn: [1, 2],
  });
});

test('getBoardResult correctly returns true when the col is winning', () => {
  expect(getBoardResult(boardColWin)).toBe(true);
});

test('getWinningBoardSum correctly calculates unmarked numbers times last number called', () => {
  const winningBoard = [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ];
  const scoreboard = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
  ];
  expect(getWinningBoardSum(winningBoard, scoreboard)).toBe(188);
});

test('getWinningScore correctly calculates unmarked numbers times last number called', () => {
  expect(getWinningScore(testData)).toBe(4512);
});

test('getLastWinningScore correctly calculates unmarked numbers times last number called', () => {
  expect(getLastWinningScore(testData)).toBe(1924);
});
