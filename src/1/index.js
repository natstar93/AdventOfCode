import getNoOfIncreases from './getNoOfIncreases';
import depths from './data';

const part1Answer = getNoOfIncreases(depths);
const part2Answer = getNoOfIncreases(depths, 3);

export default {part1Answer, part2Answer};
