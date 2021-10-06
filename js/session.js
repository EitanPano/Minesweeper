'use strict';

// gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     livesCount: 3,
//     isHintOn: false,
//     hintsCount: 3,
//     safeClicks: 3,
//     isFirstClick : true
// };


function undoStamp() {
    if (sessionStorage.getItem('timeStamps') === null) {
        console.log('Undo button works after first click');
        return;
    }
    var timeStamps = JSON.parse(sessionStorage.getItem('timeStamps'));
    var lastStamp = timeStamps.pop();
    sessionStorage.setItem('timeStamps', JSON.stringify(timeStamps));
    if (!lastStamp) return;

    var lastCell = lastStamp[0];
    var lastState = lastStamp[1];

    if (lastCell) {
        var currCell = gBoard[lastCell.i][lastCell.j];
        currCell = syncCell(currCell, lastCell)
        renderCell({ i: currCell.i, j: currCell.j })
    }
    var currState = gGame;
    gGame = syncGameState(currState, lastState);
    renderHints();
    renderLives();
    elSafeClickSpan.innerText = 'x' + gGame.safeClicks;
    // console.log(gGame, lastState);
}

function syncGameState(currState, lastState) {
    currState.shownCount = lastState.shownCount;
    currState.markedCount = lastState.markedCount;
    currState.livesCount = lastState.livesCount;
    currState.hintsCount = lastState.hintsCount;
    currState.safeClicks = lastState.safeClicks;
    return currState;
}


function syncCell(currCell, lastCell) {
    currCell.isRevealed = lastCell.isRevealed;
    currCell.isMarked = lastCell.isMarked;
    return currCell;
}

function saveTimeStamp(cell, gameState) {
    var timeStamp = [cell, gameState];
    if (sessionStorage.getItem('timeStamps') === null) {
        sessionStorage.setItem('timeStamps', '[]');
    }
    var timeStamps = JSON.parse(sessionStorage.getItem('timeStamps'));
    timeStamps.push(timeStamp);
    sessionStorage.setItem('timeStamps', JSON.stringify(timeStamps));
}