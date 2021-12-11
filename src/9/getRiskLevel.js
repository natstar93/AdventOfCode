export const getGrid = data => {
  const result = data.split('\n').reduce((grid, row, index) => {
    return { ...grid, [index]: row.split('').map(str => parseInt(str)) };
  }, {});
  return result;
};

const getRiskLevel = data => {
  const grid = getGrid(data);
  const rowKeys = Object.keys(grid);

  return rowKeys.reduce((sum, rowKey) => {
    const rowKeyAsInt = parseInt(rowKey);
    const row = grid[rowKey];

    const lowpointValues = row.filter((currentHeight, xIndex) => {
      const isLowerThanLeft = xIndex === 0 || row[xIndex - 1] > currentHeight;
      const isLowerThanRight =
        row.length - 1 === xIndex || row[xIndex + 1] > currentHeight;
      const isLowerThanUp =
        rowKeyAsInt === 0 || grid[rowKeyAsInt - 1][xIndex] > currentHeight;
      const isLowerThanDown =
        rowKeys.length - 1 === rowKeyAsInt ||
        grid[rowKeyAsInt + 1][xIndex] > currentHeight;

      return isLowerThanUp && isLowerThanDown && isLowerThanLeft && isLowerThanRight;
    });

    return (
      sum + lowpointValues.reduce((acc, lowpoint) => acc + lowpoint + 1, 0)
    );
  }, 0);
};

export const getBasinSize = (grid, initialX, initialY) => {
  const initialValue = grid[initialY][initialX];
  const initialCoord = [initialX, initialY];
  let coordMap = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };

  coordMap[initialValue] = [initialCoord];

  for (let i = initialValue; i < 8; i++) {
    const currentCoords = coordMap[i];

    for (let j = 0; j < currentCoords.length; j++) {
      let [x, y] = currentCoords[j];
      const left = grid[y][x - 1];
      const right = grid[y][x + 1];
      const up = grid[y - 1] && grid[y - 1][x];
      const down = grid[y + 1] && grid[y + 1][x];

      if (left && (left > i) && (left !== 9)) {
        coordMap[left].push([x - 1, y]);
      }
      if (right && (right > i) && (right !== 9)) {
        coordMap[right].push([x + 1, y]);
      }
      if (down && (down > i) && (down !== 9)) {
        coordMap[down].push([x, y + 1]);
      }
      if (up && (up > i) && (up !== 9)) {
        coordMap[up].push([x, y - 1]);
      }
    }
  }

  const total = Object.keys(coordMap).reduce(
    (total, key) => {
      const coordsDeduped = coordMap[key].reduce((allCoords, curr) => {
        const isAlreadyThere = allCoords.find(
          coord => ((coord[0] === curr[0]) && (coord[1] === curr[1]))
        );
        return isAlreadyThere ? allCoords : [...allCoords, curr];
      }, []);
      return total + coordsDeduped.length
    },
    0
  );

  return total;
};

export const getThreeLargestBasinSizesMultipledTogether = data => {
  const grid = getGrid(data);
  const rowKeys = Object.keys(grid);
  const allBasinSizes = rowKeys.reduce((sum, rowKey) => {
    const row = grid[rowKey];
    const rowKeyAsInt = parseInt(rowKey);

    const basinSizes = row.reduce((sizes, currentHeight, xIndex) => {
      const isLowerThanLeft = xIndex === 0 || row[xIndex - 1] > currentHeight;
      const isLowerThanRight =
        row.length - 1 === xIndex || row[xIndex + 1] > currentHeight;
      const isLowerThanUp =
        rowKeyAsInt === 0 || grid[rowKeyAsInt - 1][xIndex] > currentHeight;
      const isLowerThanDown =
        rowKeys.length - 1 === rowKeyAsInt ||
        grid[rowKeyAsInt + 1][xIndex] > currentHeight;

      const isLowpoint =
        isLowerThanUp && isLowerThanDown && isLowerThanLeft && isLowerThanRight;

      if (isLowpoint) {
        const basinSize = getBasinSize(grid, xIndex, rowKeyAsInt);
        return [...sizes, basinSize];
      }

      return sizes;
    }, []);

    return [...sum, ...basinSizes];
  }, []);

  return allBasinSizes.sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, num) => num * total, 1);
};

export default getRiskLevel;
