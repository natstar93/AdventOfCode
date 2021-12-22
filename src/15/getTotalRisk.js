const fs = require('fs');

export const sanitiseData = filepath => {
  const data = fs.readFileSync(filepath, { encoding: 'utf-8' })
    .split('\n')
    .map(row => row.split('').map(item => parseInt(item, 10)));
  return data;
};

export const getUnvisitedSet = data => {
  const unvisitedSet = data.reduce((acc, row, yIndex) => {
    const coordsRow = row.map((_item, xIndex) => [xIndex, yIndex]);
    return [...acc, ...coordsRow];
  }, []);
  return unvisitedSet;
};

export const getInfinityMap = (data, startCoord) => {
  const infinityMap = data.map(row => row.map(_item => Infinity));
  infinityMap[startCoord[0]][startCoord[1]] = 0;
  return infinityMap;
};

export const getDijkstrasPathMap = (riskLevels, startCoord) => {
  let unvisitedSet = getUnvisitedSet(riskLevels);
  const unvisitedCount = unvisitedSet.length;
  const riskPathMap = getInfinityMap(riskLevels, startCoord);

  for (let i = 0; i < unvisitedCount; i += 1) {
    const currentNode = unvisitedSet[0];
    const [y, x] = currentNode;
    const risk = riskPathMap[y][x];
    const belowItemRiskLevel = riskLevels[y][x + 1];
    const rightItemRiskLevel = riskLevels[y + 1] && riskLevels[y + 1][x];

    if (belowItemRiskLevel
        && belowItemRiskLevel + risk < riskPathMap[y][x + 1]
    ) {
      riskPathMap[y][x + 1] = belowItemRiskLevel + risk;
    }
    if (rightItemRiskLevel
        && rightItemRiskLevel + risk < riskPathMap[y + 1][x]
    ) {
      riskPathMap[y + 1][x] = rightItemRiskLevel + risk;
    }
    const remainingNodes = unvisitedSet.filter(
      coord => !(coord[0] === currentNode[0] && coord[1] === currentNode[1]),
    );
    unvisitedSet = remainingNodes;
  }

  return riskPathMap;
};

const getTotalRisk = filepath => {
  const startCoord = [0, 0];
  const riskLevels = sanitiseData(filepath);
  const destinationCoord = [riskLevels.length - 1, riskLevels[0].length - 1];

  const lowestPathsMap = getDijkstrasPathMap(
    riskLevels,
    startCoord,
    destinationCoord,
  );

  return lowestPathsMap[destinationCoord[0]][destinationCoord[1]];
};

export default getTotalRisk;
