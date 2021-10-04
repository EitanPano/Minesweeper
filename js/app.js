'use strict';
// DOM JS FILE


function init() {
    // cancel default right click menu
    window.addEventListener("contextmenu", e => e.preventDefault());

    gBoard = createBoard(gBoardSize);
    setMines(gMinesAmount, gBoardSize);
    renderBoard(gBoard);
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td
            class= "hidden"
            data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)"
            oncontextmenu="markCell(this)"
            >${(board[i][j].hasMine) ? MINE : ''}</td>`

        }
        strHTML += `</tr>`
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}

function markCell(el) {
    console.log('right clicked');
    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isRevealed) return;

    if (!cell.isMarked) {
        cell.isMarked = true;
        el.innerText = MARK;
        el.style.color = 'initial';
    }
    else {
        cell.isMarked = false;
        el.style.color = 'transparent';
        el.innerText = (cell.hasMine) ? MINE : '';
    }
    console.log(cell);
}

function cellClicked(el) {
    var cell = gBoard[el.dataset.i][el.dataset.j];
    if (cell.isMarked) return;

    cell.isRevealed = true;
    // on lose
    if (cell.hasMine) {
        el.style.backgroundColor = 'red';
        gameOver()
    }
    el.style.color = 'initial';
    console.log(el);

}


function gameOver() {
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