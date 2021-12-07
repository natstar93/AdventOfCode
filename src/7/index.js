import getAmountOfFuel from './getAmountOfFuel';
import data from './data';

const part1Answer = getAmountOfFuel(data);
const part2Answer = getAmountOfFuel(data, true);

export default { part1Answer, part2Answer };
