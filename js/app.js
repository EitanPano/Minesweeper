'use strict';
// DOM JS FILE


function init(boardSize = gLevel.SIZE, minesAmount = gLevel.MINES) {
    // cancel default right click menu
    window.addEventListener("contextmenu", e => e.preventDefault());

    resetGame(boardSize, minesAmount);
    gBoard = createBoard(boardSize);
    setMines(minesAmount);
    renderBoard(gBoard);
}
// resetGame()

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
    startTimer();
    if (!gGame.isOn) return;
    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isRevealed) return;

    if (!cell.isMarked) {
        cell.isMarked = true;
        el.innerText = MARK;
        gGame.markedCount++;
        if (gGame.markedCount === gLevel.MINES) checkGameOver();
        el.style.color = 'initial';
    }
    else {
        cell.isMarked = false;
        gGame.markedCount--
        el.style.color = 'transparent';
        el.innerText = (cell.hasMine) ? MINE : '';
    }
}

function cellClicked(el) {
    startTimer();
    if (!gGame.isOn) return;
    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isMarked) return;
    if (cell.isRevealed) return;
    cell.isRevealed = true;
    // on lose
    if (cell.hasMine) {
        el.style.backgroundColor = 'red';
        gameOver();
    }
    else revealCell(el)
}

function revealCell(el) {
    el.style.color = 'initial';
    el.style.backgroundColor = 'gray';
    var elPos = {i: parseInt(el.dataset.i), j : parseInt(el.dataset.j)};
    var nearbyCells = getNearbyCells(gBoard, elPos.i, elPos.j);
    var mines = scanMines(nearbyCells);
    if (mines.length === 0) {
        // Expanding goes here
        el.innerText = '';
    }
    else el.innerText = mines.length;
    gGame.shownCount++;
    if (gGame.shownCount === (gLevel.SIZE ** 2) - gLevel.MINES) checkGameOver();
}

function gameOver() {
    gGame.isOn = false;
    pauseTimer();
    var elTds = document.querySelectorAll('td');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].style.color = 'initial';
    }
}

// STILL UNUSED
function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}