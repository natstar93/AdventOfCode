import getSyntaxErrorScore from './getSyntaxErrorScore';
import getAutocompleteScore from './getAutocompleteScore';
import data from './data';

const part1Answer = getSyntaxErrorScore(data);
const part2Answer = getAutocompleteScore(data);

export default { part1Answer, part2Answer };
