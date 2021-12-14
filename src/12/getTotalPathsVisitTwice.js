const isLower = char => char.toLowerCase() == char;

export const getDuplicateSmallCave = (start) => {
  const duplicateSmallLetter = start.find((letter, idx) => {
    return isLower(letter) && start.indexOf(letter) !== idx;
  });
  return (duplicateSmallLetter);
};

export const getSmallCavesInPath = (start) => {
  const smallCaves = start.reduce((acc, letter) => {
    return isLower(letter) ? [...acc, letter] : acc;
  }, []);
  return (smallCaves);
};

export const getPossibleMoves = (move, start, end, middleCommands) => {
  let remainingCommands = middleCommands;
  const [moveStart, moveEnd] = move.split('-');

  const duplicateSmallCave = getDuplicateSmallCave(start);
  const removeMovesThatLeadTo = (value, commands) => commands.filter(item => !(item.split('-')[1] === value))
  const isInPathAlready = (value, path) => path.find((letter) => letter === value);

  const smallCaves = getSmallCavesInPath(start);

  if (isLower(moveEnd) && (isInPathAlready(moveEnd, start) || duplicateSmallCave)) {
    for (let i = 0; i < smallCaves.length; i++) {
      remainingCommands = removeMovesThatLeadTo(smallCaves[i], middleCommands);
    }
    for (let i = 0; i < smallCaves.length; i++) {
      remainingCommands = remainingCommands.filter(cmd => cmd !== `${moveEnd}-${smallCaves[i]}`);
    }
  }
  if (isLower(moveStart) && duplicateSmallCave) {
    for (let i = 0; i < smallCaves.length; i++) {
      remainingCommands = removeMovesThatLeadTo(smallCaves[i], remainingCommands)
    }
  }

  return remainingCommands;
}

export const getPaths = (start, end, middleCommands) => {
  const allPaths = [];

  const nextMoves = middleCommands.filter(cmd => {
    return start[start.length - 1] === cmd.split('-')[0];
  });

  for (let i = 0; i < nextMoves.length; i++) {
    const [_nextStart, nextEnd] = nextMoves[i].split('-');

    if (nextEnd === end) {
      allPaths.push([...start, end])
    }

    const remainingCommands = getPossibleMoves(nextMoves[i], start, end, middleCommands)
    const furtherMoves = getPaths([...start, nextEnd], end, remainingCommands);

    if (furtherMoves.length > 0) {
      const extendedPaths = furtherMoves.map(move => move);
      allPaths.push(...extendedPaths);
    }
  }

  return allPaths;
}

const getTotalPathsVisitTwice = data => {
  const instructions = data.split('\n').reduce((acc, curr) => {
    const [from, to] = curr.split('-');
    if (from === 'start') return { ...acc, start: acc.start ? [...acc.start, curr] : [curr] };
    if (to === 'start') return { ...acc, start: acc.start ? [...acc.start, `${to}-${from}`] : [`${to}-${from}`] };
    if (to === 'end') return { ...acc, end: acc.end ? [...acc.end, curr] : [curr] };
    if (from === 'end') return { ...acc, end: acc.end ? [...acc.end, `${to}-${from}`] : [`${to}-${from}`] };
    return { ...acc, middle: acc.middle ? [...acc.middle, `${from}-${to}`, `${to}-${from}`] : [`${from}-${to}`, `${to}-${from}`] };
  }, {});


  const easyOnes = instructions.start.reduce((acc, startCommand) => {
    const [startFrom, startTo] = startCommand.split('-');
    return [...acc, ...(instructions.end.reduce((commands, endCommand) => {
      const [endFrom, endTo] = endCommand.split('-');
      const result = endFrom === startTo ?
        [...commands, [startFrom, startTo, endTo]]
        : commands;

      return result;
    }, []))
    ]
  }, []);

  const complexOnes = instructions.start.reduce((acc, startCommand) => {
    const [_startFrom, startTo] = startCommand.split('-');
    return [...acc, ...(instructions.end.reduce((commands, endCommand) => {
      const [endFrom, _endTo] = endCommand.split('-');
      const result = getPaths([startTo], endFrom, instructions.middle);
      return result.length > 0 ? [...commands, ...result] : commands;
    }, []))
    ]
  }, []);

  return easyOnes.length + complexOnes.length;
};

export default getTotalPathsVisitTwice;



