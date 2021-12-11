import getTotalFlashes, { getSimultaneouslyFlashingStep } from './getTotalFlashes';
import data from './data';

const part1Answer = getTotalFlashes(100, data);
const part2Answer = getSimultaneouslyFlashingStep(data);

export default { part1Answer, part2Answer };
