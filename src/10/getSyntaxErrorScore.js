
export const getFirstCorruptedChar = line => {
  const charMap = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  }
  let corruptedChar = '';
  const expectedChars = [];
  const openingChars = Object.keys(charMap);
  const chars = line.split('');

  for (let i = 0; i < chars.length; i++) {
    const currChar = chars[i];
    const currClosingChar = charMap[currChar];

    if (expectedChars.slice(-1) == currChar) {
      expectedChars.pop();
    } else if (openingChars.includes(currChar)) {
      expectedChars.push(currClosingChar);
    } else {
      corruptedChar = currChar;
    }
    if (corruptedChar.length) return corruptedChar;
  }
};

const getSyntaxErrorScore = data => {
  const rows = data.split('\n');
  const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  return rows.reduce((total, row) => {
    const firstCorruptedChar = getFirstCorruptedChar(row);
    if(!firstCorruptedChar) return total;
    return total + scores[firstCorruptedChar];
  }, 0)
};

export default getSyntaxErrorScore;
