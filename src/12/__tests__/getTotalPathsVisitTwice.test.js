import getTotalPathsVisitTwice, { getPaths, getPossibleMoves, getDuplicateSmallCave } from '../getTotalPathsVisitTwice';
import testData from '../testData';

const exampleInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const exampleInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

test('getPaths gets all valid paths from b to b', () => {
  const middleCommands = ['A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b'];

  expect(getPaths(['b'], 'b', middleCommands)).toEqual([
    ['b', 'A', 'c', 'A', 'b'],
    ['b', 'A', 'b'],
    ['b', 'd', 'b'],
  ]);
});

test('getPaths gets all valid paths from A to b', () => {
  const middleCommands = ['A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b'];

  expect(getPaths(['A'], 'b', middleCommands)).toEqual([
    ['A', 'c', 'A', 'c', 'A', 'b'],
    ['A', 'c', 'A', 'b'],
    ['A', 'c', 'A', 'b', 'A', 'b'],
    ['A', 'c', 'A', 'b', 'd', 'b'],
    ['A', 'b'],
    ['A', 'b', 'A', 'c', 'A', 'b'],
    ['A', 'b', 'A', 'b'],
    ['A', 'b', 'd', 'b'],
  ]);
});

test('getDuplicateSmallCave returns duplicated cave', () => {
  expect(getDuplicateSmallCave(['b'])).toEqual(undefined);
  expect(getDuplicateSmallCave(['b', 'A', 'c', 'c'])).toEqual('c');
  expect(getDuplicateSmallCave(['B', 'C', 'A', 'C'])).toEqual(undefined);
});


test('getPossibleMoves gets list of possible moves', () => {
  const middleCommands = ['A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b'];

  expect(getPossibleMoves('b-d', ['b'], 'b', middleCommands)).toEqual(
    ['A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b']
  );

  expect(getPossibleMoves('c-A', ['b', 'A', 'c'], 'b', ['c-A', 'b-A', 'b-d', 'A-b', 'd-b'])).toEqual(
    ['c-A', 'b-A', 'b-d', 'A-b', 'd-b']
  );

  expect(getPossibleMoves('c-A', ['A', 'c', 'A', 'c'], 'b', ['A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b'])).toEqual(
    ['c-A', 'A-b', 'b-A', 'b-d', 'd-b']
  );

  expect(getPossibleMoves('A-b', ['A', 'c', 'A', 'c', 'A'], 'b', ['c-A', 'A-b', 'b-A', 'b-d', 'd-b'])).toEqual(
    ['c-A', 'A-b', 'b-A', 'b-d', 'd-b']
  );

  expect(getPossibleMoves('A-b', ['A', 'c', 'A', 'c', 'A'], 'b', ['A-b', 'b-A', 'b-d', 'd-b'])).toEqual(
    ['A-b', 'b-A', 'b-d', 'd-b']
  );

  expect(getPossibleMoves('LN-dc', ['HN', 'kj', 'dc', 'LN'], 'HN', [
    'dc-HN', 'HN-dc',
    'LN-dc', 'dc-LN',
    'kj-sa', 'sa-kj',
    'kj-HN', 'HN-kj',
    'kj-dc', 'dc-kj'
  ])).toEqual([
    "dc-HN",
    "dc-LN",
    "kj-sa",
    "sa-kj",
    "kj-HN",
    "HN-kj",
  ]);
});

test('getTotalPathsVisitTwice gets total number of valid paths', () => {
  expect(getTotalPathsVisitTwice(exampleInput)).toEqual(36);
  expect(getTotalPathsVisitTwice(exampleInput2)).toEqual(103);
  expect(getTotalPathsVisitTwice(testData)).toEqual(3509);
});
