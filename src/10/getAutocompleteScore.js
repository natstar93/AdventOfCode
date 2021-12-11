export const getRequiredClosingChars = line => {
  const closingChars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  }
  let corruptedChar = '';
  const expectedChars = [];
  const openingChars = Object.keys(closingChars);
  const chars = line.split('');

  for (let i = 0; i < chars.length; i++) {
    const currChar = chars[i];
    
    if (expectedChars.slice(0, 1) == currChar) {
      expectedChars.shift();
    } else if (openingChars.includes(currChar)) {
      expectedChars.unshift(closingChars[currChar]);
    } else {
      corruptedChar = currChar;
    }
    if (corruptedChar.length) return null;
  }
  return expectedChars.length ? expectedChars : null;
};

const getAutocompleteScore = data => {
  const rows = data.split('\n');
  const scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  const rowScores = rows.reduce((acc, row) => {
    const chars = getRequiredClosingChars(row);
    if (!chars) return acc;
    const total = chars.reduce((rowTotal, char) => ((rowTotal * 5) + scores[char]), 0);
    return [...acc, total];
  }, []);
  const sortedRowScores = rowScores.sort((a, b) => a - b);
  return sortedRowScores[(sortedRowScores.length - 1)/2];
};

export default getAutocompleteScore;
