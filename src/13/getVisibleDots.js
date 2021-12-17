
export const extractData = data => {
  const [coordList, rawInstructions] = data.split('\n\n');
  const initialCoords = coordList.split('\n').reduce((acc, item) => {
    const [x, y] = item.split(',').map(item => parseInt(item));
    return { ...acc, [`x${x}y${y}`]: { coords: [x, y], value: 1 } }; // assumes only one of each coord
  }, {});

  const { yMax, xMax } = coordList.split('\n').reduce((acc, item) => {
    const [x, y] = item.split(',').map(item => parseInt(item));
    return {
      yMax: Math.max(y, acc.yMax),
      xMax: Math.max(x, acc.xMax),
    }
  }, { yMax: 0, xMax: 0 });

  const instructions = rawInstructions.split('\n').reduce((acc, item) => {
    const [key, value] = item.replace('fold along ', '').split('=');
    return [...acc, { direction: key, value: parseInt(value) }];
  }, []);

  return { initialCoords, instructions, xMax, yMax };
}

export const getFoldedCoords = (inputCoords, fold, xMax, yMax) => {
  const { direction, value: foldValue } = fold;
  return Object.keys(inputCoords).reduce((acc, key) => {
    const coordEntry = inputCoords[key];
    const [x, y] = coordEntry.coords;
    let newKey;
    let newCoord;

    if (direction === 'y') {
      const yDiffToFold = y - foldValue;
      const movedY = y > foldValue ? y - (2 * yDiffToFold) : y;
      const yOffset = foldValue - (yMax - foldValue);
      const newY = movedY - yOffset;

      newKey = [`x${x}y${newY}`];
      newCoord = [x, newY];
    }

    if (direction === 'x') {
      const xDiffToFold = x - foldValue;
      const movedX = x > foldValue ? x - (2 * xDiffToFold) : x;
      const xOffset = foldValue - (xMax - foldValue);
      const newX = movedX - xOffset;

      newKey = `x${newX}y${y}`;
      newCoord = [newX, y];
    }

    return {
      ...acc,
      coordinates: { ...acc.coordinates, [newKey]: { coords: newCoord, value: 1 } },
      xMax: newCoord[0] > acc.xMax ? newCoord[0] : acc.xMax,
      yMax: newCoord[1] > acc.yMax ? newCoord[1] : acc.yMax,
    };
  }, { coordinates: {}, xMax: 0, yMax: 0 })
}

export const getFinalOutput = (data) => {
  const { initialCoords, instructions, xMax: initialX, yMax: initialY } = extractData(data);
  let coords = initialCoords;
  let x = initialX;
  let y = initialY;

  for (let i = 0; i < instructions.length; i++) {
    const { coordinates, xMax, yMax } = getFoldedCoords(coords, instructions[i], x, y);
    coords = coordinates;
    x = xMax;
    y = yMax;
  }

  let gridOutput = '';

  for (let i = 0; i < y + 1; i++) {
    gridOutput += '\n';
    for (let j = 0; j < x + 1; j++) {
      if (coords[`x${j}y${i}`]) {
        gridOutput += '#'
      } else { gridOutput += ' ' }
    }
  }

  return gridOutput;
};

const getVisibleDots = (data) => {
  const { initialCoords, instructions, xMax, yMax } = extractData(data);
  const { coordinates } = getFoldedCoords(initialCoords, instructions[0], xMax, yMax);

  return Object.keys(coordinates).length;
};

export default getVisibleDots;

