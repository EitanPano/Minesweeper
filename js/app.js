'use strict';
// DOM JS FILE

renderBoard(gBoard);

function renderBoard(board){
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td id="${i,j}" onclick="cellClicked(this)"></td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}