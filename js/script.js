'use strict';

const playerEl1 = document.querySelector('.player--0');
const playerEl2 = document.querySelector('.player--1');
const score1Ele = document.getElementById('score--0');
const score2Ele = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currScoreEl1 = document.getElementById('current--0');
const currScoreEl2 = document.getElementById('current--1');

// const btnNew=

let currScore, activePlayer, scores, playing;
const init = function () {
    score1Ele.textContent = 0;
    score2Ele.textContent = 0;
    currScoreEl1.textContent = 0;
    currScoreEl2.textContent = 0;

    diceEl.classList.add('hidden')
    playerEl1.classList.remove('player--winner')
    playerEl2.classList.remove('player--winner')
    playerEl1.classList.add('player--active');
    playerEl2.classList.remove('player--active');

    playing = true;
    scores = [0, 0];
    activePlayer = 0;
    currScore = 0;
}
init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 1 ? 0 : 1;
    currScore = 0;
    playerEl1.classList.toggle('player--active');
    playerEl2.classList.toggle('player--active');
}


document.querySelector('.btn--roll').addEventListener('click', function () {
    if (playing) {
        let dice = Math.trunc(Math.random() * 6 + 1);
        diceEl.classList.remove('hidden')
        diceEl.src = `./img/dice-${dice}.png`;

        if (dice != 1) {
            currScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currScore;

        } else {
            switchPlayer();
        }
    }
})

document.querySelector('.btn--hold').addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currScore;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
            playing = false;
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
})

document.querySelector('.btn--new').addEventListener('click', init)