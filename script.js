// Selecting elements

//players
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.querySelector('#name--0');
const name1El = document.querySelector('#name--1');

//dice
const diceEl = document.querySelector('.dice');

//btns
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnPlay = document.querySelector('.btn--play');

//modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//global variables
let scores, currentScore, activePlayer, gameStatus;

//helpers
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const getData = function() {
  name0El.innerHTML = document.querySelector('.player-name-0').value;
  name1El.innerHTML = document.querySelector('.player-name-1').value;
  closeModal();
}

//Initial status
const reset = function () {
  scores = [0, 0]
  currentScore = 0;
  activePlayer = 0;
  gameStatus = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add("hidden");
  
  openModal();

  btnCloseModal.addEventListener('click', closeModal);
  btnPlay.addEventListener('click', getData);
  overlay.addEventListener('click', closeModal);
};


//Switch player function 
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}


//Rolling function 
btnRoll.addEventListener('click', function () {
  if (gameStatus) {
    //random number from 1 to 6 
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check if dice value is 1
    if (dice !== 1) {
      //add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

//Holding function
btnHold.addEventListener('click', function () {
  if (gameStatus) {
    // add current score to active player global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // check if active player is >= 100
    if (scores[activePlayer] >= 20) {
      //finish game
      gameStatus = false;
      diceEl.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//new game function
btnNew.addEventListener('click', reset);

reset();


// Modal code
