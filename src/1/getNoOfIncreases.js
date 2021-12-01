
const getNoOfIncreases = (data) => data.reduce(
    (acc, curr, currIndex) => data[currIndex +1] > curr ? acc + 1 : acc, 0
);

export default getNoOfIncreases;
