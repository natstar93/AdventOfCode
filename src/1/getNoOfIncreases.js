
const getNoOfIncreases = (data, interval = 1) => data.reduce(
    (acc, curr, currIndex) => data[currIndex + interval] > curr ? acc + 1 : acc, 0
);

export default getNoOfIncreases;
