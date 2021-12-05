export const sanitiseDataInput = dataInput => {
  const result = dataInput.split(/\n/);
  return result;
};

export const getCoordsArr = (dataInput, withDiagonals = false) => {
  const result = dataInput.reduce((acc, curr) => {
    const endpoints = curr.split(' -> ');

    const [x1, y1] = endpoints[0].split(',');
    const [x2, y2] = endpoints[1].split(',');

    let coords = [];

    const isHorizontal = x1 === x2;
    const isVertical = y1 === y2;

    const xMax = Math.max(x1, x2);
    const yMax = Math.max(y1, y2);
    const xMin = Math.min(x1, x2);
    const yMin = Math.min(y1, y2);
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const isDiagonal = Math.abs(xDiff) === Math.abs(yDiff);
    const topLeftToBottomRight = isDiagonal && Math.sign(xDiff * yDiff) === 1;

    if (!(isHorizontal || isVertical || (isDiagonal && withDiagonals)))
      return acc;

    if (isDiagonal) {
      if (topLeftToBottomRight) {
        for (let xIndex = xMin; xIndex <= xMax; xIndex++) {
          for (let yIndex = yMin; yIndex <= yMax; yIndex++) {
            if (xIndex - xMin === yIndex - yMin) {
              coords.push({ xIndex, yIndex });
            }
          }
        }
      } else {
        for (let xIndex = xMax; xIndex >= xMin; xIndex--) {
          for (let yIndex = yMax; yIndex >= yMin; yIndex--) {
            if (xIndex - xMin === yMax - yIndex) {
              coords.push({ xIndex, yIndex });
            }
          }
        }
      }
    } else {
      for (let xIndex = xMin; xIndex <= xMax; xIndex++) {
        for (let yIndex = yMin; yIndex <= yMax; yIndex++) {
          coords.push({ xIndex, yIndex });
        }
      }
    }

    return [...acc, ...coords];
  }, []);

  return result;
};

export const getCoordMatches = coords => {
  let matchCounter = 0;
  let overlappingCoords = [];
  for (let i = 0; i < coords.length; i++) {
    const currCoord = coords[i];

    const matches = coords.find((coord, index) => {
      if (index == i) return false;

      const isMatch =
        coord.xIndex === currCoord.xIndex &&
        coord.yIndex === currCoord.yIndex &&
        !(overlappingCoords.find(
          overlapCoord =>
            overlapCoord.xIndex === coord.xIndex &&
            overlapCoord.yIndex === coord.yIndex
        ));

      return isMatch;
    });

    if (matches) {
      overlappingCoords = [...overlappingCoords, matches];
      matchCounter += 1;
    }
  }

  return matchCounter;
};

const getOverlaps = (data, withDiagonals = false) => {
  let timer = new Date();
  console.log('start', new Date() - timer);
  const coordinates = sanitiseDataInput(data);
  console.log('coordinates done', new Date() - timer);
  const coordsArr = getCoordsArr(coordinates, withDiagonals);
  console.log('coordsArr done', new Date() - timer);
  const matches = getCoordMatches(coordsArr);
  console.log('matches done', new Date() - timer);

  return matches;
};

export default getOverlaps;
