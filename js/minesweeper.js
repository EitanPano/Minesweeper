'use strict';
// MODEL JS FILE

var gBoard = createBoard(8);

function createBoard(size, bombNum) {
    var board = [];
    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
            var col = { i, j };
            row.push(col);
        }
        board.push(row);
    }
    return board;
}