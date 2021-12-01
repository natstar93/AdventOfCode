import getNoOfIncreases, { getNoOfSlidingIncreases } from './getNoOfIncreases';
import depths from './data';

const part1Answer = getNoOfIncreases(depths);
const part2Answer = getNoOfSlidingIncreases(depths);

export default {part1Answer, part2Answer};
