'use strict';

function getEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function drawNum() {
    return gNums.splice(getRandomInt(0, gNums.length - 1), 1)[0];
}

function countNegs(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // not outside mat
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // not outside mat
            if (j < 0 || j > mat[0].length - 1) continue;

            // not on selected pos
            if (i === rowIdx && j === colIdx) continue;
            if (mat[i][j] === 'X') count++;
        }
    }
    return count;
}

function getRandomColor() {
    var letters = 'ABCDE';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}