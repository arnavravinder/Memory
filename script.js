const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

const emojis = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
let shuffledEmojis = [];
let flippedCards = [];
let matchedPairs = 0;
let time = 0;
let score = 0;
let timerInterval;

const shuffleEmojis = () => {
  shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
};

const createBoard = () => {
  gameBoard.innerHTML = '';
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    card.setAttribute('data-aos', 'zoom-in');
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
};

const flipCard = (e) => {
  const clickedCard = e.target;
  const cardIndex = clickedCard.getAttribute('data-index');
  if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
    clickedCard.classList.add('flipped');
    clickedCard.textContent = shuffledEmojis[cardIndex];
    flippedCards.push(clickedCard);
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
};

const checkForMatch = () => {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    matchedPairs++;
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    card1.style.backgroundColor = '#00cc66';
    card2.style.backgroundColor = '#00cc66';
    flippedCards = [];
    if (matchedPairs === emojis.length / 2) {
      clearInterval(timerInterval);
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
    flippedCards = [];
  }
};

const startTimer = () => {
  time = 0;
  timeDisplay.textContent = `Time: ${time}s`;
  timerInterval = setInterval(() => {
    time++;
    timeDisplay.textContent = `Time: ${time}s`;
  }, 1000);
};

const restartGame = () => {
  matchedPairs = 0;
  flippedCards = [];
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  clearInterval(timerInterval);
  shuffleEmojis();
  createBoard();
  startTimer();
};

shuffleEmojis();
createBoard();
startTimer();
restartBtn.addEventListener('click', restartGame);
const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const winSound = document.getElementById('winSound');

const flipCard = (e) => {
  const clickedCard = e.target;
  const cardIndex = clickedCard.getAttribute('data-index');
  if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
    flipSound.play();
    clickedCard.classList.add('flipped');
    clickedCard.textContent = shuffledEmojis[cardIndex];
    flippedCards.push(clickedCard);
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
};

const checkForMatch = () => {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    matchSound.play();
    matchedPairs++;
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    card1.style.backgroundColor = '#00cc66';
    card2.style.backgroundColor = '#00cc66';
    flippedCards = [];
    if (matchedPairs === emojis.length / 2) {
      clearInterval(timerInterval);
      winSound.play();
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
    flippedCards = [];
  }
};
