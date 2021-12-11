const getNoOfUniqueSegments = data => {
  return data.split('\n').reduce((acc, currLine) => {
    return (
      acc +
      currLine
        .split('|')[1]
        .split(' ')
        .reduce((totalLineOutput, currItem) => {
          return [2, 3, 4, 7].includes(currItem.length)
            ? totalLineOutput + 1
            : totalLineOutput;
        }, 0)
    );
  }, 0);
};

export const getNumberCodes = input => {
  const inputVals = input.split(' ');
  const one = inputVals.find(val => val.length === 2);
  const seven = inputVals.find(val => val.length === 3);
  const four = inputVals.find(val => val.length === 4);
  const eight = inputVals.find(val => val.length === 7);

  const l5Digits = inputVals.filter(val => val.length === 5); // 5, 2, 3
  const l6Digits = inputVals.filter(val => val.length === 6); // 9, 6, 0
  const three = l5Digits.find(digit => {
    return digit.includes(one.split('')[0]) && digit.includes(one.split('')[1]);
  });

  const nine = l6Digits.find(digit => {
    return three
      .split('')
      .every(threeLetter => digit.split('').includes(threeLetter));
  });

  const zero = l6Digits.find(
    digit =>
      digit !== nine &&
      digit.includes(one.split('')[0]) &&
      digit.includes(one.split('')[1])
  );

  const six = l6Digits.find(digit => digit !== nine && digit !== zero);

  const five = l5Digits.find(digit => {
    return digit.split('').every(letter => six.split('').includes(letter));
  });

  const two = l5Digits.find(digit => digit !== five && digit !== three);

  return [zero, one, two, three, four, five, six, seven, eight, nine];
};

export const getIsMatch = (item1, item2) => {
  return ((item1.length === item2.length) && item1.split('').every(item1Val => item2.split('').includes(item1Val)));
}

export const getOutputs = data => {
  const reading = data.split('\n').reduce((acc, entry) => {
    const [signalPatterns, output] = entry.split(' | ');
    const outputCodes = output.split(' ');
    const orderedSignalPatterns = getNumberCodes(signalPatterns);

    const outputNums = outputCodes.map(outputCode => (
      Object.keys(orderedSignalPatterns).find(key => (
        getIsMatch(orderedSignalPatterns[key], outputCode)
      ))
    ));

    const digit = outputNums.join('');
    return acc + parseInt(digit);
  }, 0);

  return reading;
};

export default getNoOfUniqueSegments;
