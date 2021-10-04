'use strict';
// DOM JS FILE




function init() {
    gBoard = createBoard(gBoardSize);
    setMines(gMinesAmount, gBoardSize);
    renderBoard(gBoard);
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            strHTML += (board[i][j].hasMine) ? 
            `<td
            data-i="${i}"
            data-j="${j}"
            onclick="cellClicked(this)"
            >${MINE}</td>`
            :
            `<td
            data-i="${i}"
            data-j="${j}"
            onclick="cellClicked(this)"
            ></td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}

function cellClicked(el) {
    console.log(el);
    // reveal
    gBoard[el.dataset.i][el.dataset.j].isRevealed = true;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}