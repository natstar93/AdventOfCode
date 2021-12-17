import getVisibleDots, { extractData, getFoldedCoords, getFinalOutput } from '../getVisibleDots';
import testData, { testDataOneStep } from '../testData';

const extract = `6,10
0,14

fold along y=7
fold along x=5
fold along y=3`;

const afterOneFold = `
# ##  #  # 
#   #      
      #   #
#   #      
 # #  # ###`;

const expectedOutput = `
#####
#   #
#   #
#   #
#####`;

test('extractData gets data in correct format', () => {
  expect(extractData(extract)).toEqual({
    initialCoords: [[6, 10], [0, 14]],
    initialCoords: {
      x6y10: { coords: [6, 10], value: 1 },
      x0y14: { coords: [0, 14], value: 1 }
    },
    instructions: [
      { direction: 'y', value: 7 },
      { direction: 'x', value: 5 },
      { direction: 'y', value: 3 }
    ],
    yMax: 14,
    xMax: 6
  });
});

test('getFoldedCoords gets coords after equal y fold', () => {
  const inputCoords = {
    x6y10: { coords: [6, 10], value: 1 },
    x0y14: { coords: [0, 14], value: 1 }
  };
  const outputCoords = {
    x6y4: { coords: [6, 4], value: 1 },
    x0y0: { coords: [0, 0], value: 1 }
  };
  const fold = { direction: 'y', value: 7 };
  expect(getFoldedCoords(inputCoords, fold, 6, 14)).toEqual({ coordinates: outputCoords, xMax: 6, yMax: 4 });
});

test('getFoldedCoords gets coords after unequal y fold', () => {
  const inputCoords = {
    x0y0: { coords: [0, 0], value: 1 },
    x0y3: { coords: [0, 3], value: 1 }
  };
  const outputCoords = {
    x0y1: { coords: [0, 1], value: 1 },
    x0y0: { coords: [0, 0], value: 1 }
  };
  const fold = { direction: 'y', value: 1 };
  expect(getFoldedCoords(inputCoords, fold, 0, 3)).toEqual({ coordinates: outputCoords, xMax: 0, yMax: 1 });
});

test('getFoldedCoords gets coords after unequal y fold where yMax > y', () => {
  const inputCoords = {
    x0y0: { coords: [0, 0], value: 1 },
    x0y3: { coords: [0, 3], value: 1 }
  };
  const outputCoords = {
    x0y2: { coords: [0, 2], value: 1 },
    x0y1: { coords: [0, 1], value: 1 }
  };
  const fold = { direction: 'y', value: 1 };
  expect(getFoldedCoords(inputCoords, fold, 0, 4)).toEqual({ coordinates: outputCoords, xMax: 0, yMax: 2 });
});

test('getFoldedCoords gets coords after unequal x fold where xMax > x', () => {
  const inputCoords = {
    x4y0: { coords: [4, 0], value: 1 },
    x1y0: { coords: [1, 0], value: 1 }
  };
  const outputCoords = {
    x1y0: { coords: [1, 0], value: 1 },
    x2y0: { coords: [2, 0], value: 1 }
  };
  const fold = { direction: 'x', value: 2 };
  expect(getFoldedCoords(inputCoords, fold, 5, 0)).toEqual({ coordinates: outputCoords, xMax: 2, yMax: 0 });
});

test('getVisibleDots gets number of visible dots after instruction', () => {
  expect(getVisibleDots(extract)).toEqual(2);
  expect(getVisibleDots(testData)).toEqual(17);
});

test('getFinalOutput gets dot image', () => {
  expect(getFinalOutput(testDataOneStep)).toEqual(afterOneFold);
  expect(getFinalOutput(testData)).toEqual(expectedOutput);
});
