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
    gGame.isOn = true;
    gIsFirstClick = false;
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