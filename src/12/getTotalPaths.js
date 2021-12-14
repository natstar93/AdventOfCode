const isLower = char => char.toLowerCase() == char;

// start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end

// for each start command
// add end if same letter and save to output array
// find every command with letter 
// for each command with letter add to temp array
// add end if same letter and save to output array
// find every command with letter IF not already in chain
// 

export const getPaths = (start, end, middleCommands ) => {
  const allPaths = [];

  const nextMoves = middleCommands.filter(cmd => {
    const [from, to] = cmd.split('-');
    return start === from;
  });

  for(let i = 0; i < nextMoves.length; i++){
    let remainingCommands = middleCommands;
    const [nextStart, nextEnd] = nextMoves[i].split('-');

    if(nextEnd === end) {
      allPaths.push([start, end])
    }
    if(isLower(nextEnd)) {
      remainingCommands = remainingCommands.filter(item => !(item.split('-')[1] === nextEnd))
    }
    if(isLower(nextStart)) {
      remainingCommands = remainingCommands.filter(item => !(item.split('-')[1] === nextStart))
    }
    const furtherMoves = getPaths(nextEnd, end, remainingCommands);

    if(furtherMoves.length > 0) {
      const extendedPaths = furtherMoves.map(move => [start, ...move]);
      allPaths.push(...extendedPaths);
    }
  }

  return allPaths;
}

const getTotalPaths = data => {
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
      const [ endFrom, endTo] = endCommand.split('-');
      const result = endFrom === startTo ? 
      [...commands, [startFrom, startTo, endTo] ] 
      : commands;

      return result;
    }, []))
  ]
  }, []);

  const complexOnes = instructions.start.reduce((acc, startCommand) => {
    const [_startFrom, startTo] = startCommand.split('-');
    return [...acc, ...(instructions.end.reduce((commands, endCommand) => {
      const [ endFrom, _endTo] = endCommand.split('-');
      if((startTo === endFrom) && isLower(startTo)) return commands;
      const result = getPaths(startTo, endFrom, instructions.middle);
      return result.length > 0 ? [...commands, ...result] : commands;
    }, []))
  ]
  }, []);

  return easyOnes.length + complexOnes.length;
};

export default getTotalPaths;



