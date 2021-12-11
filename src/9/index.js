import getRiskLevel, { getThreeLargestBasinSizesMultipledTogether } from './getRiskLevel';
import data from './data';

const part1Answer = getRiskLevel(data);
const part2Answer = getThreeLargestBasinSizesMultipledTogether(data);

export default { part1Answer, part2Answer };
