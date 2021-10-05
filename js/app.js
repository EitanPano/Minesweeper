'use strict';
// DOM JS FILE


function init(boardSize = gLevel.SIZE, minesAmount = gLevel.MINES) {
    // cancel default right click menu
    window.addEventListener("contextmenu", e => e.preventDefault());

    resetGame(boardSize, minesAmount);
    gBoard = createBoard(boardSize);
    // setMines(minesAmount);
    // updateCellMinesAround(gBoard);
    renderBoard(gBoard);
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
    if (gIsFirstClick) startGame(el.dataset.i, el.dataset.j);
    if (!gGame.isOn) return;

    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isMarked) return;
    // if (cell.isRevealed) return;
    // on lose
    if (cell.hasMine) {
        revealCell({ i: el.dataset.i, j: el.dataset.j });
        el.style.backgroundColor = 'red';
        gameOver();
    }
    if (!cell.isRevealed) {
        checkCell(el.dataset.i, el.dataset.j);
        if (gGame.shownCount === (gLevel.SIZE ** 2) - gLevel.MINES) checkGameOver();
    }
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
    elCell.style.backgroundColor = 'gray';
    if (cell.minesAround === 1) elCell.style.color = 'rgb(0, 0, 220)';
    if (cell.minesAround === 2) elCell.style.color = 'rgb(0, 220, 100)';
    if (cell.minesAround === 3) elCell.style.color = 'rgb(220, 0, 0)';



    elCell.innerText = cell.hasMine ? MINE : (cell.minesAround ? cell.minesAround : '');
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