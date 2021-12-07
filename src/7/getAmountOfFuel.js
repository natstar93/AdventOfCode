export const getFactorial = num => {
  let total = 0;
  for (let i = num; i > 0; i--) {
    total += i;
  }
  return total;
};

export const getFuelToMoveAllToPosition = (
  desiredPosition,
  positions,
  isFuelUseFactorial
) =>
  positions.reduce((acc, number) => {
    const positionChange = Math.abs(desiredPosition - number);
    const fuelUnits = isFuelUseFactorial
      ? getFactorial(positionChange)
      : positionChange;
    return acc + fuelUnits;
  }, 0);

const getAmountOfFuel = (positions, isFuelUseFactorial = false) => {
  const initialValue = getFuelToMoveAllToPosition(
    positions[0],
    positions,
    isFuelUseFactorial
  );
  return Object.keys(positions).reduce((minFuel, currentPosition) => {
    const currentFuel = getFuelToMoveAllToPosition(
      parseInt(currentPosition),
      positions,
      isFuelUseFactorial
    );
    return currentFuel < minFuel ? currentFuel : minFuel;
  }, initialValue);
};

export default getAmountOfFuel;
