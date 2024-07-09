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
const matchcheck = () => {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
      matchSound.play();
      matchedPairs++;
      score += 10;
      scoreDisplay.textContent = `Score: ${score}`;
      card1.classList.add('correct');
      card2.classList.add('correct');
      setTimeout(() => {
        card1.classList.remove('correct');
        card2.classList.remove('correct');
      }, 500);
      flippedCards = [];
      if (matchedPairs === emojis.length / 2) {
        clearInterval(timerInterval);
        winSound.play();
        setTimeout(() => alert('You won!'), 500);
      }
    } else {
      card1.classList.add('wrong');
      card2.classList.add('wrong');
      setTimeout(() => {
        card1.classList.remove('wrong');
        card2.classList.remove('wrong');
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 500);
    }
  };
  const countdownDisplay = document.getElementById('countdown');
let countdownTime = 60;
let countdownInterval;

const startCountdown = () => {
  countdownTime = 60;
  countdownDisplay.textContent = `Time left: ${countdownTime}s`;
  countdownInterval = setInterval(() => {
    countdownTime--;
    countdownDisplay.textContent = `Time left: ${countdownTime}s`;
    if (countdownTime === 0) {
      clearInterval(countdownInterval);
      clearInterval(timerInterval);
      setTimeout(() => alert('Game Over!'), 500);
    }
  }, 1000);
};

const restartgame = () => {
  matchedPairs = 0;
  flippedCards = [];
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
  shuffleEmojis();
  createBoard();
  startTimer();
  startCountdown();
};

shuffleEmojis();
createBoard();
startTimer();
startCountdown();
restartBtn.addEventListener('click', restartGame);
const highScoreDisplay = document.getElementById('highScore');
let highScore = 0;

const updateHighScore = () => {
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    localStorage.setItem('highScore', highScore);
  }
};

const loadHighScore = () => {
  const savedHighScore = localStorage.getItem('highScore');
  if (savedHighScore) {
    highScore = parseInt(savedHighScore, 10);
    highScoreDisplay.textContent = `High Score: ${highScore}`;
  }
};

const checkMatch = () => {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    matchSound.play();
    matchedPairs++;
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    card1.classList.add('correct');
    card2.classList.add('correct');
    setTimeout(() => {
      card1.classList.remove('correct');
      card2.classList.remove('correct');
    }, 500);
    flippedCards = [];
    if (matchedPairs === emojis.length / 2) {
      clearInterval(timerInterval);
      clearInterval(countdownInterval);
      winSound.play();
      updateHighScore();
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    card1.classList.add('wrong');
    card2.classList.add('wrong');
    setTimeout(() => {
      card1.classList.remove('wrong');
      card2.classList.remove('wrong');
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 500);
  }
};

loadHighScore();
const createBoard = () => {
    gameBoard.innerHTML = '';
    shuffledEmojis.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-index', index);
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('data-aos', 'zoom-in');
      card.addEventListener('click', flipCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          flipCard(e);
        }
      });
      gameBoard.appendChild(card);
    });
  };
  
  const flipCard = (e) => {
    const clickedCard = e.target;
    const cardIndex = clickedCard.getAttribute('data-index');
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
      flipSound.play();
      clickedCard.classList.add('flipped');
      clickedCard.setAttribute('aria-pressed', 'true');
      clickedCard.textContent = shuffledEmojis[cardIndex];
      flippedCards.push(clickedCard);
      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  };
  
  const chkmatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
      matchSound.play();
      matchedPairs++;
      score += 10;
      scoreDisplay.textContent = `Score: ${score}`;
      card1.classList.add('correct');
      card2.classList.add('correct');
      card1.setAttribute('aria-pressed', 'false');
      card2.setAttribute('aria-pressed', 'false');
      setTimeout(() => {
        card1.classList.remove('correct');
        card2.classList.remove('correct');
      }, 500);
      flippedCards = [];
      if (matchedPairs === emojis.length / 2) {
        clearInterval(timerInterval);
        clearInterval(countdownInterval);
        winSound.play();
        updateHighScore();
        setTimeout(() => alert('You won!'), 500);
      }
    } else {
      card1.classList.add('wrong');
      card2.classList.add('wrong');
      setTimeout(() => {
        card1.classList.remove('wrong');
        card2.classList.remove('wrong');
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.setAttribute('aria-pressed', 'false');
        card2.setAttribute('aria-pressed', 'false');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 500);
    }
  };
  const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');

const emojisEasy = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
const emojisMedium = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
const emojisHard = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥥', '🥝', '🍈', '🍍', '🥥', '🥝', '🍈'];

let difficulty = 'medium';

const setDifficulty = (level) => {
  difficulty = level;
  switch (difficulty) {
    case 'easy':
      emojis = [...emojisEasy, ...emojisEasy];
      break;
    case 'medium':
      emojis = [...emojisMedium];
      break;
    case 'hard':
      emojis = [...emojisHard];
      break;
  }
  restartGame();
};

easyBtn.addEventListener('click', () => setDifficulty('easy'));
mediumBtn.addEventListener('click', () => setDifficulty('medium'));
hardBtn.addEventListener('click', () => setDifficulty('hard'));

restartBtn.addEventListener('click', restartGame);

setDifficulty('medium');
