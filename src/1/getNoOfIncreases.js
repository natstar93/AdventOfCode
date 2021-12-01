
const getNoOfIncreases = (data) => data.reduce(
    (acc, curr, currIndex) => data[currIndex +1] > curr ? acc + 1 : acc, 0
);

export const getNoOfSlidingIncreases = (data) => data.reduce(
    (acc, curr, currIndex) => {
        if (!data[currIndex + 3]) return acc;
        const currAverage = (curr + data[currIndex + 1] + data[currIndex + 2]) / 3;
        const nextAverage = (data[currIndex + 1] + data[currIndex + 2] + data[currIndex + 3]) / 3;
        return nextAverage > currAverage ? acc + 1 : acc;
    }, 0
);

export default getNoOfIncreases;
