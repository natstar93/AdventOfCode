
export const getLetterOccurrences = (pairRecord, endLetters) => {
  const record = endLetters.reduce((acc, curr) => ({...acc, [curr] : acc[curr] ? 1 : 0.5}), {});

  const result = Object.keys(pairRecord).reduce((acc, pairKey) => {
    const [l1, l2] = pairKey.split('');
    if(l1 === l2) {
      return { ...acc, [l1]: (acc[l1] || 0) + (pairRecord[pairKey])}
    }
    return {
      ...acc,
      [l1]: (acc[l1] || 0) + (pairRecord[pairKey] / 2),
      [l2]: (acc[l2] || 0) + (pairRecord[pairKey] / 2),
    }
  }, record);
  return result;
}

const getElementDiff = (data, iterations) => {
  const [initialTemplate, pairInsertionRules] = data.split('\n\n');
  const firstLetter = initialTemplate[0];
  const lastLetter = initialTemplate[initialTemplate.length - 1];

  const rules = pairInsertionRules.split('\n').reduce((acc, curr) => {
    const [pairToMatch, elementToInsert] = curr.split(' -> ');
    return { ...acc, [pairToMatch]: elementToInsert };
  }, {});

  let pairRecord = initialTemplate.split('').reduce((acc, curr, idx) => {
    if (!initialTemplate[idx + 1]) return acc;
    const pair = `${curr}${initialTemplate[idx + 1]}`;
    return {
      ...acc,
      [pair]: acc[pair] ? acc[pair] + 1 : 1,
    }
  }, []);

  for (let i = 0; i < iterations; i++) {
    const pairRecordUpdated = Object.keys(pairRecord).reduce((acc, pairKey) => {
      const [pairFirst, pairLast] = pairKey.split('');
      const numOfPairs = pairRecord[pairKey];
      const newElement = rules[pairKey];

      return {
        ...acc,
        [`${pairFirst}${newElement}`]: acc[`${pairFirst}${newElement}`] ? acc[`${pairFirst}${newElement}`] + numOfPairs : numOfPairs,
        [`${newElement}${pairLast}`]: acc[`${newElement}${pairLast}`] ? acc[`${newElement}${pairLast}`] + numOfPairs : numOfPairs,
      }

    }, {});

    pairRecord = pairRecordUpdated;
  }

  const letterOccurrences = getLetterOccurrences(pairRecord, [firstLetter, lastLetter]);
  const vals = Object.keys(letterOccurrences).map(key => letterOccurrences[key]);

  return Math.max(...vals) - Math.min(...vals);
};

export default getElementDiff;



