'use strict';
// DOM JS FILE

var elSmiley = document.querySelector('.smiley');
var elHints = document.querySelector('.hints-display span');
var elLives = document.querySelector('.lives-display span');
var elTime = document.querySelector('.time-display');

function init(boardSize = gLevel.SIZE, minesAmount = gLevel.MINES) {
    // cancel default right click menu
    window.addEventListener("contextmenu", e => e.preventDefault());
    getBestTimes();

    resetGame(boardSize, minesAmount);
    gBoard = createBoard(boardSize);
    renderBoard(gBoard);
    getDifficulty();
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td
            class= "hidden"
            data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)"
            oncontextmenu="markCell(this)"
            >${(board[i][j].hasMine) ? MINE : ''}</td>`;
        }
        strHTML += `</tr>`;
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}

function markCell(el) {
    if (gIsFirstClick) startGame([el.dataset.i], [el.dataset.j]);

    if (!gGame.isOn) return;
    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isRevealed) return;

    if (!cell.isMarked) {
        cell.isMarked = true;
        el.innerText = MARK;
        gGame.markedCount++;
        el.style.color = 'initial';
        checkGameOver();
    }
    else {
        cell.isMarked = false;
        gGame.markedCount--
        el.style.color = 'transparent';
        el.innerText = (cell.hasMine) ? MINE : '';
    }
}

function cellClicked(el) {
    if (gIsFirstClick) startGame(el.dataset.i, el.dataset.j);
    if (!gGame.isOn) return;

    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isMarked) return;

    if (gGame.isHintOn) {
        HintNextClick(gBoard, +el.dataset.i, +el.dataset.j);
        toggleHint();
        renderHints();
        gHintTimeOut = setTimeout(() => {
            hideHints(gBoard, +el.dataset.i, +el.dataset.j);
        }, 1000);
    }
    else checkCell(el.dataset.i, el.dataset.j);
    checkGameOver();
}

function startGame(i, j) {
    gGame.isOn = true;
    gIsFirstClick = false;
    startTimer();
    gFirstCellPos = { i: +i, j: +j };
    setMines(gLevel.MINES);
    updateCellMinesAround(gBoard);
}

function revealCell(pos) {
    var cell = gBoard[pos.i][pos.j];
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    cell.isRevealed = true;
    if (cell.hasMine) mineStep(elCell);
    else numStep(cell, elCell);
}

function mineStep(elCell) {
    gGame.markedCount++;
    gGame.livesCount--;
    elCell.innerText = MINE;
    elCell.style.backgroundColor = 'red';
    elCell.style.color = 'initial';

    var strLivesHTML = '';
    for (var i = 0; i < gGame.livesCount; i++) strLivesHTML += '💖';
    elLives.innerText = strLivesHTML;
}

function numStep(cell, elCell) {
    elCell.style.backgroundColor = 'gray';
    if (cell.minesAround === 1) elCell.style.color = 'rgb(0, 0, 220)';
    if (cell.minesAround === 2) elCell.style.color = 'rgb(0, 220, 100)';
    if (cell.minesAround === 3) elCell.style.color = 'rgb(220, 0, 0)';
    elCell.innerText = cell.minesAround ? cell.minesAround : '';
}

function revealMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell.hasMine) {
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCell.innerText = MINE;
                elCell.style.color = 'initial';
            }
        }
    }
}

function gameOver() {
    gGame.isOn = false;
    pauseTimer();

}