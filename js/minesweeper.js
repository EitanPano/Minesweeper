'use strict';
// MODEL JS FILE

const MINE = '💣';
const MARK = '🚩';
const LIVES = '💖'


var gBoard;
var gLevel = { SIZE: 8, MINES: 12 };
var gGame;
var gIsFirstClick = true;
var gFirstCellPos;
var gHintTimeOut;
var gSafeClickTimeOut;

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
        if (currRandomCell.i === gFirstCellPos.i &&
            currRandomCell.j === gFirstCellPos.j) continue;
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
    if (gGame.livesCount === 0) {
        elSmiley.innerText = '😭';
        revealMines();
        gameOver();
    }
    if (gGame.shownCount === (gLevel.SIZE ** 2) - gLevel.MINES &&
        gGame.markedCount === gLevel.MINES) {
        elSmiley.innerText = '😎';
        gameOver();
        saveTime(gCurrentDifficulty);
        checkBestTime(gCurrentDifficulty);
    }
}

function checkCell(i, j) {
    var cell = gBoard[i][j];
    if (!cell.isRevealed) {
        revealCell({ i, j });
        if (!cell.hasMine) gGame.shownCount++;
        if (!cell.minesAround && !cell.hasMine) {
            expandRevealing(i, j);
        }
    }
}

function updateCellMinesAround(board) {
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

function expandRevealing(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === row && j === col) continue;
            if (gBoard[i][j].hasMine || gBoard[i][j].isMarked) continue;
            checkCell(i, j);
        }
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
        livesCount: 3,
        isHintOn: false,
        hintsCount: 3,
        safeClicks: 3
    }
    gIsFirstClick = true;
    elLives.innerText = '💖💖💖';
    elSmiley.innerText = '😀';
    elHints.innerText = '💡💡💡';
}

function findSafeClick() {
    if (gSafeClickTimeOut) return;
    var currRandomCell;
    var i = 0;
    while (i < 1) {
        currRandomCell = gBoard[getRandomInt(0, gLevel.SIZE - 1)][getRandomInt(0, gLevel.SIZE - 1)];
        if (currRandomCell.hasMine || currRandomCell.isRevealed || currRandomCell.isMarked) continue;
        var elCell = document.querySelector(`[data-i="${currRandomCell.i}"][data-j="${currRandomCell.j}"]`);
        console.log(elCell);
        elCell.style.color = 'initial';
        elCell.style.backgroundColor = 'rgb(110, 209, 255)';
        i++;
    }
    gSafeClickTimeOut = setTimeout(() => {
        elCell.style.color = 'transparent';
        elCell.style.backgroundColor = 'rgba(130, 159, 255, 0.692)';
        gSafeClickTimeOut = null;
    }, 3000)
}

function toggleHint() {
    if (gHintTimeOut) return;
    if (!gGame.isOn) return;
    gGame.isHintOn = (!gGame.isHintOn) ? true : false;
    elHints.classList.toggle('hints-aura');
    console.log(gGame.isHintOn);
}

function HintNextClick(board, row, col) {
    if (gHintTimeOut) return;
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            var cell = board[i][j];
            if (cell.isRevealed) continue;

            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
            elCell.style.color = 'initial';
            elCell.style.backgroundColor = 'lightgreen';
            if (cell.hasMine) elCell.innerText = MINE;
            else if (cell.minesAround) elCell.innerText = cell.minesAround;

        }
    }
    gGame.hintsCount--;
}

function renderHints() {
    var strHintsHTML = ''
    for (var i = 0; i < gGame.hintsCount; i++) {
        strHintsHTML += '💡'
    }
    elHints.innerText = strHintsHTML;
}

function hideHints(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            var cell = board[i][j];
            if (cell.isRevealed) continue;

            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
            elCell.style.color = 'transparent';
            elCell.style.backgroundColor = 'rgba(130, 159, 255, 0.692)';
        }
    }
    gHintTimeOut = null;
}