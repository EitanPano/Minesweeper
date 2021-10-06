'use strict';

var gCurrentDifficulty;
var elLeaderBoard = document.querySelector('.leader-board');
var elBeginnerTime = document.querySelector('.beginner');
var elMediumTime = document.querySelector('.medium');
var elExpertTime = document.querySelector('.expert');
var gLeaderBoardTimeOut;


function openLeaderBoard() {
    elLeaderBoard.style.visibility = 'visible';
    gLeaderBoardTimeOut = setTimeout(() => {
        elLeaderBoard.style.visibility = 'hidden';
    }, 3000)
}

function closeLeaderBoard() {
    elLeaderBoard.style.visibility = 'hidden';
    clearTimeout(gLeaderBoardTimeOut);
    gLeaderBoardTimeOut = null;
}

function getDifficulty(levelSize = gLevel.SIZE) {
    switch (levelSize) {
        case 4: gCurrentDifficulty = 'Beginner';
            break;
        case 8: gCurrentDifficulty = 'Medium';
            break;
        case 12: gCurrentDifficulty = 'Expert';
            break;
    }
}

function getBestTimes() {
    var beginnerTime = JSON.parse(localStorage.getItem('Beginner'));
    if (beginnerTime) elBeginnerTime.innerText = beginnerTime;
    var mediumTime = JSON.parse(localStorage.getItem('Medium'));
    if (mediumTime) elMediumTime.innerText = mediumTime;
    var expertTime = JSON.parse(localStorage.getItem('Expert'));
    if (expertTime) elExpertTime.innerText = expertTime;
}

function saveTime(difficulty) {
    if (localStorage.getItem(difficulty) === null) {
        localStorage.setItem(difficulty, '[]');
    }
    var times = JSON.parse(localStorage.getItem(difficulty));
    var time = elTime.innerText;
    times.push(time);

    localStorage.setItem(difficulty, JSON.stringify(times));
}

function checkBestTime(difficulty) {
    var difficultyTimes = JSON.parse(localStorage.getItem(difficulty));
    var sortedTimes = [];
    var lastBestTime;

    difficultyTimes.forEach(time => sortedTimes.push(time.replaceAll(":", "")));

    sortedTimes.sort();
    lastBestTime = sortedTimes[0].match(/.{1,2}/g);
    lastBestTime = `${lastBestTime[0]}:${lastBestTime[1]}:${lastBestTime[2]}`;
    localStorage.setItem(difficulty, JSON.stringify([lastBestTime]));
    console.log(difficulty, lastBestTime);
}