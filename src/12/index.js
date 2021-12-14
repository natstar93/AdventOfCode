import getTotalPaths from './getTotalPaths';
import getTotalPathsVisitTwice from './getTotalPathsVisitTwice';
import data from './data';

const part1Answer = getTotalPaths(data);
const part2Answer = getTotalPathsVisitTwice(data);

export default { part1Answer, part2Answer };
