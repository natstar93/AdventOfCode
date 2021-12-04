import getWinningScore, { getLastWinningScore } from './getWinningScore';
import data from './data';

const part1Answer = getWinningScore(data);
const part2Answer = getLastWinningScore(data);

export default { part1Answer, part2Answer };
