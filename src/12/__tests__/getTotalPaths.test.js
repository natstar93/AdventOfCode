import getTotalPaths, { getPaths } from '../getTotalPaths';
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

test('getPaths gets all valid paths from b to A', () => {
  const middleCommands = [ 'A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b' ];

  expect(getPaths('b', 'A', middleCommands)).toEqual([
    ['b','A'],
    ['b','A','c','A'],
  ]);
  expect(getPaths('b', 'A', ['b-A', 'A-b'])).toEqual([
    ['b','A'],
  ]);
  
});

test('getPaths gets all valid paths from A to b', () => {
  const middleCommands = [ 'A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b' ];

  expect(getPaths('A', 'b', middleCommands)).toEqual([
    ['A','c','A','b'],
    ['A','b'],
 
  ]);
});

test('getPaths gets all valid paths from A to A', () => {
  const middleCommands = [ 'A-c', 'c-A', 'A-b', 'b-A', 'b-d', 'd-b' ];

  expect(getPaths('A', 'A', middleCommands)).toEqual([
    ['A','c', 'A'],
    ['A','c','A','b', 'A'],
    ['A','b', 'A'],
    ['A','b','A','c', 'A'],
  ]);
});

test('getTotalPaths gets total number of valid paths', () => {
  expect(getTotalPaths(exampleInput)).toEqual(10);
  expect(getTotalPaths(exampleInput2)).toEqual(19);
  expect(getTotalPaths(testData)).toEqual(226);
});
