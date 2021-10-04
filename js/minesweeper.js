'use strict';
// MODEL JS FILE

const MINE = '💣';
const FLAG = '🚩';

var gBoardSize = 8;
var gMinesAmount = 10;

var gBoard;

;
function createBoard(boardSize) {
    var board = [];

    for (var i = 0; i < boardSize; i++) {
        var row = [];
        for (var j = 0; j < boardSize; j++) {
            var col = {
                i,
                j,
                isRevealed: false,
                isMarked: false,
                hasMine: false
            };
            row.push(col);
        }
        board.push(row);
    }
    return board;
}

function setMines(minesAmount, boardSize) {
    var currRandomCell;
    var i = 0;
    while (i < minesAmount) {
        currRandomCell = gBoard[getRandomInt(0, boardSize-1)][getRandomInt(0, boardSize-1)];
        if (currRandomCell.hasMine) continue;
        currRandomCell.hasMine = true;
        console.log(currRandomCell);
        i++
    }
}

