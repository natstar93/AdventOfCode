
export const getChain = (templatePairs, rules) => {
  let acc = templatePairs[0].split('')[0];

  for(let i = 0; i < templatePairs.length; i++) {
    const closing = templatePairs[i].split('')[1];
    const mid = rules[templatePairs[i]];
    acc += `${mid}${closing}`
  }
  return acc;
}

const getElementQuantity = (data, iterations) => {
  const [initialTemplate, pairInsertionRules] = data.split('\n\n');
  let template = initialTemplate;

  const rules = pairInsertionRules.split('\n').reduce((acc, curr) => {
    const [pairToMatch, elementToInsert] = curr.split(' -> ');
    return { ...acc, [pairToMatch]: elementToInsert };
  }, {});

  for(let i = 0; i < iterations; i++) {
    const templateElements = template.split('');
    const templatePairs = templateElements.reduce((acc, curr, idx) => {
      return templateElements[idx + 1] ? [...acc, `${curr}${templateElements[idx + 1]}`] : acc;
    }, []);
    template = getChain(templatePairs, rules);
  }

  const letterOccurrences = template.split('').reduce((acc, curr) => {
    return acc[curr] ? {...acc, [curr]: acc[curr] + 1 } : {...acc, [curr]: 1 }
  }, []); 

  const vals = Object.keys(letterOccurrences).map(key => letterOccurrences[key]);

  return Math.max(...vals) - Math.min(...vals);
};

export default getElementQuantity;



