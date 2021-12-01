
const getNoOfIncreases = (data) => data.reduce(
    (acc, curr, currIndex) => data[currIndex +1] > curr ? acc + 1 : acc, 0
);

export const getNoOfSlidingIncreases = (data) => data.reduce(
    (acc, curr, currIndex) => data[currIndex + 3] > curr ? acc + 1 : acc, 0
);

export default getNoOfIncreases;
