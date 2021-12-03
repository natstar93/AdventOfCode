import getPowerConsumption, { getLifeSupportRating } from './getPowerConsumption';
import diagnostics from './data';

const part1Answer = getPowerConsumption(diagnostics);
const part2Answer = getLifeSupportRating(diagnostics);

export default {part1Answer, part2Answer};
