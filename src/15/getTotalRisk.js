const fs = require('fs');

export const sanitiseData = filepath => {
  const data = fs.readFileSync(filepath, { encoding: 'utf-8' })
    .split('\n')
    .map(row => row.split('').map(item => parseInt(item, 10)));
  return data;
};

export const getUnvisitedSet = data => {
  const unvisitedSet = data.reduce((acc, row, rowIdx) => {
    const coordsRow = row.map((_item, xIdx) => xIdx);
    return { ...acc, [rowIdx]: coordsRow };
  }, {});
  return unvisitedSet;
};

export const getInfinityMap = (data, startCoord) => {
  const infinityMap = data.map(row => row.map(_item => Infinity));
  infinityMap[startCoord[0]][startCoord[1]] = 0;
  return infinityMap;
};

export const getLargeGrid = riskLevels => {
  const largeGrid = [];
  const getGridIncremented = (grid, increments) => grid.map(
    row => row.map(item => {
      const newItem = item + increments;
      return newItem < 10
        ? newItem
        : newItem.toString().split('').reduce(
          (sum, part) => parseInt(part, 10) + sum,
          0,
        );
    }),
  );

  for (let i = 0; i < 9; i++) {
    const gridI = i < 1 ? riskLevels : getGridIncremented(riskLevels, i);
    const maxRow = Math.min(i + 1, 5);
    const minRow = Math.max(i - 4, 0);
    for (let j = minRow; j < maxRow; j++) {
      for (let k = 0; k < gridI.length; k++) {
        largeGrid[k + j * gridI.length] = [
          ...(largeGrid[k + j * gridI.length] || []), ...gridI[k],
        ];
      }
    }
  }
  return largeGrid;
};

export const getDijkstrasPathMap = (
  riskLevels,
  startCoord,
) => {
  const unvisitedSet = getUnvisitedSet(riskLevels);
  const unvisitedCount = Object.keys(unvisitedSet).length
    * unvisitedSet['0'].length;
  const riskPathMap = getInfinityMap(riskLevels, startCoord);
  const destinationCoord = [riskLevels.length - 1, riskLevels[0].length - 1];
  let currentNode = startCoord;

  for (let i = 0; i < unvisitedCount; i += 1) {
    const [y, x] = currentNode;
    const risk = riskPathMap[y][x];

    if (y === destinationCoord[0] && x === destinationCoord[1]) {
      return riskPathMap;
    }

    const neighbours = [[y, x + 1], [y, x - 1], [y + 1, x], [y - 1, x]]
      .map(([yCoord, xCoord]) => ({
        tentativeDistance: riskLevels[yCoord]
          && riskLevels[yCoord][xCoord] + risk,
        currentDistance: riskPathMap[yCoord] && riskPathMap[yCoord][xCoord],
        yCoord,
        xCoord,
      }));

    for (let j = 0; j < neighbours.length; j += 1) {
      const neighbour = neighbours[j];
      const { yCoord, xCoord } = neighbour;
      if (neighbour.tentativeDistance < neighbour.currentDistance
      ) {
        riskPathMap[yCoord][xCoord] = neighbour.tentativeDistance;
      }
    }

    unvisitedSet[y.toString()] = unvisitedSet[y.toString()]
      .filter(xCoord => xCoord !== x);

    const nextNode = Object.keys(unvisitedSet).reduce((
      acc,
      key,
    ) => unvisitedSet[key].reduce((rowAcc, item) => (
      riskPathMap[parseInt(key, 10)][item] < riskPathMap[rowAcc[0]][rowAcc[1]]
        ? [parseInt(key, 10), item]
        : rowAcc), acc), destinationCoord);

    currentNode = nextNode;
  }

  return riskPathMap;
};

const getTotalRisk = (filepath, useLargeGrid = false) => {
  const startCoord = [0, 0];
  const inputData = sanitiseData(filepath);
  const riskLevels = useLargeGrid ? getLargeGrid(inputData) : inputData;

  const lowestPathsMap = getDijkstrasPathMap(
    riskLevels,
    startCoord,
  );

  return lowestPathsMap[riskLevels.length - 1][riskLevels[0].length - 1];
};

export default getTotalRisk;
