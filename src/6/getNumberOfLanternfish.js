export const createRecord = data =>
  data.split(',').reduce((acc, curr) => {
    const num = parseInt(curr);
    return { ...acc, ...{ [num]: acc[num] ? acc[num] + 1 : 1 } };
  }, {});

export const getDaysUntilReproduction = prevRecord => {
  //age the fish
  const newAgeRecord = Object.keys(prevRecord).reduce((acc, curr) => {
    const key = parseInt(curr);
    const value = prevRecord[curr];

    return {
      ...acc,
      ...{
        [key]: acc[key] && acc[key] > 0 ? acc[key] - value : 0,
        [key - 1]: acc[key - 1] ? acc[key - 1] + value : value,
      },
    };
  }, {});

  // reproduce the fish
  const newFish = {
    ...newAgeRecord,
    6: (newAgeRecord[6] || 0) + (newAgeRecord[-1] || 0),
    8: (newAgeRecord[8] || 0) + (newAgeRecord[-1] || 0),
  };
  delete newFish[-1];
  return newFish;
};

const getNumberOfLanternfish = (initialState, days) => {
  let reproRecord = createRecord(initialState);

  for (let i = days; i > 0; i--) {
    reproRecord = getDaysUntilReproduction(reproRecord);
  }

  const numberOfFish = Object.keys(reproRecord).reduce(
    (acc, key) => acc + reproRecord[key],
    0
  );

  return numberOfFish;
};

export default getNumberOfLanternfish;
