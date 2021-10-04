'use strict';
// DOM JS FILE




function init() {
    renderBoard(gBoard);
    
}


function renderBoard(board){
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td data-cell="${i}-${j}" onclick="cellClicked(this)"></td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}

function cellClicked(el) {
    console.log(el);
    // reveal

}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}