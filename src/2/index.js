import getPosition, { getPositionWithAim } from './getPosition';
import commands from './data';

const part1Answer = getPosition(commands);
const part2Answer = getPositionWithAim(commands);

export default {part1Answer, part2Answer};
