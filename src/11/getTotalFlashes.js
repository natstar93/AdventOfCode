export const getGrid = data => {
  const rows = data.split('\n');
  const g = rows.map(row => row.split('').map(item => parseInt(item, 10)));
  return g;
};

export const getGridAfterOneStep = inputGrid => {
  const grid = inputGrid;
  let flashes = 0;

  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      const val = grid[y][x];
      grid[y][x] = val + 1;
    }
  }

  const hasFinishedMap = grid.map(row => row.map(_item => false));
  let hasFinished = false;

  while (!hasFinished) {
    for (let x = 0; x < grid[0].length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (!hasFinishedMap[y][x]) {
          const val = grid[y][x];
          hasFinishedMap[y][x] = true;

          if (val > 9) {
            const left = grid[y][x - 1];
            const right = grid[y][x + 1];
            const up = grid[y - 1] && grid[y - 1][x];
            const down = grid[y + 1] && grid[y + 1][x];
            const topLeft = grid[y - 1] && grid[y - 1][x - 1];
            const topRight = grid[y - 1] && grid[y - 1][x + 1];
            const bottomLeft = grid[y + 1] && grid[y + 1][x - 1];
            const bottomRight = grid[y + 1] && grid[y + 1][x + 1];

            if (left) {
              grid[y][x - 1] = left + 1;
              if (grid[y][x - 1] === 10) {
                hasFinishedMap[y][x - 1] = false;
              }
            }
            if (right) {
              grid[y][x + 1] += 1;
              if (grid[y][x + 1] === 10) {
                hasFinishedMap[y][x + 1] = false;
              }
            }
            if (up) {
              grid[y - 1][x] += 1;
              if (grid[y - 1][x] === 10) {
                hasFinishedMap[y - 1][x] = false;
              }
            }
            if (down) {
              grid[y + 1][x] += 1;
              if (grid[y + 1][x] === 10) {
                hasFinishedMap[y + 1][x] = false;
              }
            }
            if (topLeft) {
              grid[y - 1][x - 1] += 1;
              if (grid[y - 1][x - 1] === 10) {
                hasFinishedMap[y - 1][x - 1] = false;
              }
            }
            if (topRight) {
              grid[y - 1][x + 1] += 1;
              if (grid[y - 1][x + 1] === 10) {
                hasFinishedMap[y - 1][x + 1] = false;
              }
            }
            if (bottomLeft) {
              grid[y + 1][x - 1] += 1;
              if (grid[y + 1][x - 1] === 10) {
                hasFinishedMap[y + 1][x - 1] = false;
              }
            }
            if (bottomRight) {
              grid[y + 1][x + 1] += 1;
              if (grid[y + 1][x + 1] === 10) {
                hasFinishedMap[y + 1][x + 1] = false;
              }
            }
          }
        }
      }
    }

    hasFinished = hasFinishedMap
      .every(row => row.every(_item => _item === true));
  }

  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] > 9) {
        flashes += 1;
        grid[y][x] = 0;
      }
    }
  }

  return { grid, flashes };
};

export const getSimultaneouslyFlashingStep = data => {
  let steps = 0;
  let isFound = false;
  let inputGrid = getGrid(data);

  while (!isFound) {
    const { grid } = getGridAfterOneStep(inputGrid);
    steps += 1;
    isFound = grid.every(row => row.every(item => item === grid[0][0]));
    inputGrid = grid;
  }
  return steps;
};

const getTotalFlashes = (steps, data) => {
  let totalFlashes = 0;
  let inputGrid = getGrid(data);

  for (let i = 0; i < steps; i++) {
    const { grid, flashes } = getGridAfterOneStep(inputGrid);
    totalFlashes += flashes;
    inputGrid = grid;
  }
  return totalFlashes;
};

export default getTotalFlashes;
