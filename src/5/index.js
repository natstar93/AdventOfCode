import getOverlaps from './getOverlaps';
import data from './data';

const part1Answer = getOverlaps(data);
const part2Answer = getOverlaps(data, true);

export default { part1Answer, part2Answer };
