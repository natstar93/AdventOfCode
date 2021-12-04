export const getBoardResult = (boardData) => {
    const isRowWin = boardData.some(row => row.every(num => num === 1));
    if(isRowWin) return true;

    for(let i = 0; i < boardData.length; i++) {
        if(boardData.every(row => row[i] === 1)) return true;
    }
    return false;
};

const sanitiseBoards = boards => boards.map(board => {    
    const numberRegex = /\d+/g;
    return board.map(row => row.match(numberRegex));
});

export const getWinningBoardSum = (winningBoard, scoreboard) => winningBoard.reduce((accBoard, row, yIndex) => {
    const rowSum = row.reduce((accRow, item, xIndex) => {
        const shouldAddItemScore = scoreboard[yIndex][xIndex] === 0; 
        return shouldAddItemScore ? accRow + parseInt(item) : accRow;
    }, 0);
    return accBoard + rowSum;
},0);

const getWinningScore = data => {
    const gameData = data.split(/\n\n/) ;
    const numbersDrawn = gameData.shift().split(',');
    const boards = gameData.map(board => (board.split('\n')));
    const sanitisedBoards = sanitiseBoards(boards);
    let initialScoreboards = sanitisedBoards.map(board => board.map(row => row.map(item => 0)));

    for(let i = 0; i < numbersDrawn.length; i++) {
        const currentNumber = numbersDrawn[i];

        const updatedScoreboards = sanitisedBoards.reduce((scoreboards, currentGameBoard, boardIndex) => {
            let currentScoreboard = scoreboards[boardIndex];
            const newScoreboard = currentGameBoard.map((row, rowIndex) => row.map((item, itemIndex) => {
                let itemScore = currentScoreboard[rowIndex][itemIndex];
                if(item === currentNumber) {
                    itemScore = 1;
                }
                return itemScore;
            }));
            scoreboards[boardIndex] = newScoreboard;
            return scoreboards;
        }, initialScoreboards);

        const winningBoard = sanitisedBoards.reduce((acc, gameBoard, boardIndex) => {
            if(getBoardResult(updatedScoreboards[boardIndex])) {
                return { ...acc, gameBoard, scoreboard: updatedScoreboards[boardIndex] }
            }
            return acc;
        },{});

        
        const { gameBoard, scoreboard } = winningBoard;

        if(gameBoard) {
            const winningBoardSum = getWinningBoardSum(gameBoard, scoreboard);
            return winningBoardSum * parseInt(currentNumber)
        };

        initialScoreboards = updatedScoreboards;
    };
};

export default getWinningScore;
