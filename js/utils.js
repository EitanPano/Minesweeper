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

function hoverIn(el) {
    if (gBoard[el.dataset.i][el.dataset.j].isRevealed || gHintTimeOut) return;
    el.style.backgroundColor = 'rgb(190, 255, 135, 0.8)' 
}
function hoverOut(el) {
    if (gBoard[el.dataset.i][el.dataset.j].isRevealed || gHintTimeOut) return;
    el.style.backgroundColor = 'rgba(160, 120, 100, 0.8)' 
}

// location such as: {i: 2, j: 7}
function renderCell(pos) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    if (gBoard[pos.i][pos.j].isMarked) {
        elCell.style.color = 'initial';
        elCell.innerText = MARK;
    }
    else {

        elCell.style.color = 'transparent';
        elCell.style.backgroundColor = 'rgba(160, 120, 100, 0.8)';
    }
}

function drawNum() {
    return gNums.splice(getRandomInt(0, gNums.length - 1), 1)[0];
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

// STOPWATCH https://codepen.io/bnsddk/pen/pojMGGN
function timeToString(time) {
    var diffInHrs = time / 3600000;
    var hh = Math.floor(diffInHrs);

    var diffInMin = (diffInHrs - hh) * 60;
    var mm = Math.floor(diffInMin);

    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec);

    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs);

    var formattedMM = mm.toString().padStart(2, "0");
    var formattedSS = ss.toString().padStart(2, "0");
    var formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

var startTime;
var elapsedTime = 0;
var gTimerInterval;

function print(txt) {
    document.querySelector(".time-display").innerText = txt;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    gTimerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
}

function pauseTimer() {
    clearInterval(gTimerInterval);
}

function resetTimer() {
    clearInterval(gTimerInterval);
    print("00:00:00");
    elapsedTime = 0;
    gTimerInterval = 0;
}