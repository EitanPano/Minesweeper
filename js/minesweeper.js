'use strict';
// MODEL JS FILE

const MINE = '💣';
const FLAG = '🚩'

var gBoard = createBoard(8);

function createBoard(size, bombNum) {
    var board = [];

    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
            var col = {
                i,
                j,
                status: 'hidden'
            };
            row.push(col);
        }
        board.push(row);
    }
    return board;
}

function genItem(itemName = CHERRY) {
    var validCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === EMPTY) {
                validCells.push({ i, j });
            }
        }
    }
    if (!validCells.length) return;
    var randomCell = validCells[getRandomInt(0, validCells.length - 1)];
    gBoard[randomCell.i][randomCell.j] = CHERRY;
    renderCell(randomCell, itemName);
}

