'use strict';
// MODEL JS FILE

const MINE = '💣';
const MARK = '🚩';

var gBoard;
var gLevel = { SIZE: 8, MINES: 12 };
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function createBoard(boardSize = 8) {
    var board = [];

    for (var i = 0; i < boardSize; i++) {
        var row = [];
        for (var j = 0; j < boardSize; j++) {
            var col = {
                i,
                j,
                minesAround: 0,
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

function setMines(minesAmount) {
    var currRandomCell;
    var i = 0;
    while (i < minesAmount) {
        currRandomCell = gBoard[getRandomInt(0, gLevel.SIZE - 1)][getRandomInt(0, gLevel.SIZE - 1)];
        if (currRandomCell.hasMine) continue;
        currRandomCell.hasMine = true;
        i++;
    }
}

function scanMines(cells) {
    var mines = [];
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].hasMine) mines.push(cells[i]);
    }
    return mines;
}

function checkGameOver() {
    var currCell;
    var revealedMines = [];
    var revealedNums = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            currCell = gBoard[i][j];
            if (currCell.isRevealed) revealedNums.push(currCell);
            if (currCell.hasMine && currCell.isMarked) revealedMines.push(currCell);
        }
    }
    if (revealedMines.length === gLevel.MINES &&
        revealedNums.length === (gLevel.SIZE ** 2) - gLevel.MINES) {
        gameOver();
    }
}

function resetGame(boardSize, minesAmount) {
    gLevel.SIZE = boardSize;
    gLevel.MINES = minesAmount;
    resetTimer()
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
    }
}

function updateMinesAroundCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            cell.minesAround = getNegMinesCount(board, i, j);
        }
    }
}

function getNegMinesCount(board, row, col) {
    var count = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === row && j === col) continue;
            if (board[i][j].hasMine) count++;
        }
    }
    return count;
}
