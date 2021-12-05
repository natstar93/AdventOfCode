import testCoordinates, { testCoordsArr } from '../testData';
import getOverlaps, {
  sanitiseDataInput,
  getCoordsArr,
  getCoordMatches,
} from '../getOverlaps';

const testInput = `0,1 -> 0,3
3,1 -> 1,1
0,0 -> 8,8`;

test('sanitiseDataInput sanitises data', () => {
  const expectedResult = ['0,1 -> 0,3', '3,1 -> 1,1', '0,0 -> 8,8'];
  expect(sanitiseDataInput(testInput)).toEqual(expectedResult);
});

test('getCoordsArr creates an array of coordinates', () => {
  const data = ['0,1 -> 0,3', '3,1 -> 1,1', '0,0 -> 8,8'];
  const expectedResult = [
    { xIndex: 0, yIndex: 1 },
    { xIndex: 0, yIndex: 2 },
    { xIndex: 0, yIndex: 3 },
    { xIndex: 1, yIndex: 1 },
    { xIndex: 2, yIndex: 1 },
    { xIndex: 3, yIndex: 1 },
  ];
  expect(getCoordsArr(data)).toEqual(expectedResult);
});

test('getCoordsArr creates an array of coordinates when withDiagonals is true', () => {
  expect(getCoordsArr(['1,1 -> 3,13'])).toEqual([]);
  expect(getCoordsArr(['1,1 -> 3,3'], true)).toEqual([
    { xIndex: 1, yIndex: 1 },
    { xIndex: 2, yIndex: 2 },
    { xIndex: 3, yIndex: 3 },
  ]);
  expect(getCoordsArr(['2,1 -> 4,3'], true)).toEqual([
    { xIndex: 2, yIndex: 1 },
    { xIndex: 3, yIndex: 2 },
    { xIndex: 4, yIndex: 3 },
  ]);
  expect(getCoordsArr(['12,11 -> 11,12'], true)).toEqual([
    { xIndex: 12, yIndex: 11 },
    { xIndex: 11, yIndex: 12 },
  ]);
  expect(getCoordsArr(['9,7 -> 7,9'], true)).toEqual([
    { xIndex: 9, yIndex: 7 },
    { xIndex: 8, yIndex: 8 },
    { xIndex: 7, yIndex: 9 },
  ]);
  expect(getCoordsArr(['0,1 -> 0,2', '0,0 -> 5,8'], true)).toEqual([
    { xIndex: 0, yIndex: 1 },
    { xIndex: 0, yIndex: 2 },
  ]);
});

test('getCoordMatches calculates number of matches', () => {
  const coordArr = [{ xIndex: 0, yIndex: 9 }, { xIndex: 0, yIndex: 9 }, { xIndex: 0, yIndex: 9 }];
  expect(getCoordMatches(coordArr)).toBe(1);
  expect(getCoordMatches([{ xIndex: 1, yIndex: 1 }])).toBe(0);
  expect(getCoordMatches(testCoordsArr)).toBe(5);
});

test('getOverlaps calculates number of overlaps', () => {
  expect(getOverlaps(testCoordinates)).toBe(5);
});

test.only('getOverlaps calculates number of overlaps with diagonals', () => {
  const newData = `299,462 -> 299,747
855,314 -> 855,140
981,328 -> 798,328
610,444 -> 680,374
797,242 -> 606,242
217,42 -> 147,42
735,378 -> 735,188
247,192 -> 912,192
377,341 -> 768,341
472,701 -> 66,701
48,970 -> 885,133
893,35 -> 664,35
617,237 -> 951,237
540,643 -> 190,293
575,815 -> 302,815
146,380 -> 146,562
568,481 -> 568,161
38,101 -> 921,984
613,12 -> 185,12
967,30 -> 17,980
823,620 -> 584,859
672,822 -> 413,822
259,626 -> 385,752
752,415 -> 857,310
758,659 -> 758,76
909,893 -> 35,19
964,913 -> 105,54
697,196 -> 697,913
389,821 -> 163,821
783,65 -> 281,65
775,732 -> 558,732
818,817 -> 42,817
499,537 -> 896,140
81,957 -> 81,844
851,256 -> 559,548
268,970 -> 268,170
106,216 -> 68,178
107,371 -> 850,371
160,107 -> 748,107
300,619 -> 524,395
940,196 -> 780,356
752,498 -> 752,94
807,619 -> 728,619
831,89 -> 313,89
56,389 -> 191,524
206,75 -> 206,816
486,924 -> 486,389
280,708 -> 542,446
562,917 -> 190,545
40,231 -> 40,404
804,327 -> 726,249
538,670 -> 170,302
473,229 -> 912,668
645,195 -> 645,916
502,13 -> 502,266
639,955 -> 639,434
87,56 -> 943,912
143,798 -> 699,798
469,261 -> 79,651
715,98 -> 104,709`;
  expect(getOverlaps(testCoordinates, true)).toBe(12);

  expect(getOverlaps(newData, true)).toBe(247);
});
