export const getBoardResult = boardData => {
  const isRowWin = boardData.some(row => row.every(num => num === 1));
  if (isRowWin) return true;

  for (let i = 0; i < boardData.length; i++) {
    if (boardData.every(row => row[i] === 1)) return true;
  }
  return false;
};

export const sanitiseDataInput = dataInput => {
  const gameData = dataInput.split(/\n\n/);
  const numbersDrawn = gameData.shift().split(',').map(item => parseInt(item));
  const boards = gameData.map(board => board.split('\n'))
    .map(board => {
      const numberRegex = /\d+/g;
      return board.map(row => row.match(numberRegex).map(str => parseInt(str)));
    });
  return { numbersDrawn, boards };
}

export const getWinningBoardSum = (winningBoard, scoreboard) =>
  winningBoard.reduce((accBoard, row, yIndex) => {
    const rowSum = row.reduce((accRow, item, xIndex) => {
      const shouldAddItemScore = scoreboard[yIndex][xIndex] === 0;
      return shouldAddItemScore ? accRow + item : accRow;
    }, 0);
    return accBoard + rowSum;
  }, 0);

const getWinningScore = data => {
  const { numbersDrawn, boards } = sanitiseDataInput(data);
  let initialScoreboards = boards.map(board =>
    board.map(row => row.map(_item => 0))
  );

  for (let i = 0; i < numbersDrawn.length; i++) {
    const currentNumber = numbersDrawn[i];

    const updatedScoreboards = boards.reduce(
      (scoreboards, currentGameBoard, boardIndex) => {
        let currentScoreboard = scoreboards[boardIndex];
        const newScoreboard = currentGameBoard.map((row, rowIndex) =>
          row.map((item, itemIndex) => {
            let itemScore = currentScoreboard[rowIndex][itemIndex];
            if (item === currentNumber) {
              itemScore = 1;
            }
            return itemScore;
          })
        );
        scoreboards[boardIndex] = newScoreboard;
        return scoreboards;
      },
      initialScoreboards
    );

    const winningBoard = boards.reduce(
      (acc, gameBoard, boardIndex) => {
        if (getBoardResult(updatedScoreboards[boardIndex])) {
          return {
            ...acc,
            gameBoard,
            scoreboard: updatedScoreboards[boardIndex],
          };
        }
        return acc;
      },
      {}
    );

    const { gameBoard, scoreboard } = winningBoard;

    if (gameBoard) {
      const winningBoardSum = getWinningBoardSum(gameBoard, scoreboard);
      return winningBoardSum * parseInt(currentNumber);
    }

    initialScoreboards = updatedScoreboards;
  }
};

export const getLastWinningScore = data => {
  const { numbersDrawn, boards } = sanitiseDataInput(data);

  let initialScoreboards = boards.map(board =>
    board.map(row => row.map(_item => 0))
  );  

  for (let i = 0; i < numbersDrawn.length; i++) {
    const currentNumber = numbersDrawn[i];
 
    const updatedScoreboards = boards.reduce(
      (scoreboards, currentGameBoard, boardIndex) => {
        let currentScoreboard = scoreboards[boardIndex];
        const newScoreboard = currentGameBoard.map((row, rowIndex) =>
          row.map((item, itemIndex) => {
            let itemScore = currentScoreboard[rowIndex][itemIndex];
            if (item === currentNumber) {
              itemScore = 1;
            }
            return itemScore;
          })
        );
        scoreboards[boardIndex] = newScoreboard;
        return scoreboards;
      },
      initialScoreboards
    ); 

    const winningBoards = boards.reduce(
      (acc, gameBoard, boardIndex) => {
        const scoreboard = updatedScoreboards[boardIndex];
        return getBoardResult(scoreboard)
          ? [...acc, { gameBoard, scoreboard }]
          : acc;
      },
      []
    );

    if (winningBoards.length > 0) {
      for (let i = 0; i < winningBoards.length; i++) {
        const { gameBoard, scoreboard } = winningBoards[i];
        if (boards.length === 1) {
          return (
            getWinningBoardSum(gameBoard, scoreboard) * parseInt(currentNumber)
          );
        }
        const index = updatedScoreboards.indexOf(scoreboard);
        updatedScoreboards.splice(index, 1);
        boards.splice(index, 1);
      }
    }

    initialScoreboards = updatedScoreboards;
  }
};

export default getWinningScore;
